#!/usr/bin/env node
// Daily RSS pipeline: fetch → deduplicate by source_url → insert Supabase
// Requires env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const SOURCES = [
  {
    name: 'Rockstar Intel',
    url: 'https://rockstarintel.com/feed/',
    type: 'rss',
  },
  {
    name: 'GTAForums',
    url: 'https://gtaforums.com/index.php?/forums/rss/5-grand-theft-auto-vi/',
    type: 'rss',
  },
  {
    name: 'Reddit r/GTA6',
    url: 'https://www.reddit.com/r/GTA6/new.rss',
    type: 'rss',
  },
]

// ── Slug & hash helpers ────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function shortHash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0
  }
  return (h >>> 0).toString(16).slice(-4)
}

function makeSlug(title, pubDate, sourceUrl) {
  const date = new Date(pubDate).toISOString().slice(0, 10)
  return `${slugify(title)}-${date}-${shortHash(sourceUrl)}`.slice(0, 100)
}

// ── HTML stripper ─────────────────────────────────────────────────

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#\d+;/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// ── RSS 2.0 XML parser ────────────────────────────────────────────

function extractXmlTag(xml, tag) {
  const cdataRe = new RegExp(
    `<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`,
    'i'
  )
  const cdataMatch = xml.match(cdataRe)
  if (cdataMatch) return cdataMatch[1].trim()

  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i')
  const match = xml.match(re)
  return match ? match[1].trim() : ''
}

function extractLink(itemXml) {
  // <link>URL</link>
  const plain = itemXml.match(/<link>([^<]+)<\/link>/)
  if (plain) return plain[1].trim()
  // <link href="URL" .../>
  const attr = itemXml.match(/<link[^>]+href="([^"]+)"/)
  if (attr) return attr[1].trim()
  // Fallback: <guid>URL</guid>
  return extractXmlTag(itemXml, 'guid')
}

function extractContentRss(itemXml) {
  const fullRe = /<content:encoded[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/i
  const fullMatch = itemXml.match(fullRe)
  if (fullMatch) return fullMatch[1].trim()
  return extractXmlTag(itemXml, 'description')
}

function extractImageRss(itemXml) {
  const media = itemXml.match(/<media:(?:content|thumbnail)[^>]+url=["']([^"']+)["']/)
  if (media) return media[1]
  const enclosure = itemXml.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]*type=["']image/)
  if (enclosure) return enclosure[1]
  const img = itemXml.match(/<img[^>]+src=["']([^"']+)["']/)
  if (img) return img[1]
  return null
}

function parseRSS(xml) {
  const items = []
  const itemRe = /<item[^>]*>([\s\S]*?)<\/item>/gi
  let m
  while ((m = itemRe.exec(xml)) !== null) {
    const itemXml = m[1]
    items.push({
      title: extractXmlTag(itemXml, 'title'),
      link: extractLink(itemXml),
      description: extractContentRss(itemXml),
      pubDate: extractXmlTag(itemXml, 'pubDate') || extractXmlTag(itemXml, 'dc:date'),
      image: extractImageRss(itemXml),
    })
  }
  return items
}

// ── Reddit JSON parser ────────────────────────────────────────────

function parseRedditJson(json) {
  return json.data.children
    .filter((c) => !c.data.stickied)
    .map((c) => ({
      title: c.data.title,
      link: `https://www.reddit.com${c.data.permalink}`,
      description: c.data.selftext || c.data.title,
      pubDate: new Date(c.data.created_utc * 1000).toISOString(),
      image: c.data.thumbnail?.startsWith('http') ? c.data.thumbnail : null,
    }))
}

// ── Body image extractor ──────────────────────────────────────────

function extractBodyImages(html) {
  const imgs = []
  const re = /<img[^>]+(?:src|data-src|data-lazy-src|data-original)=["'](https?[^"']+)["']/gi
  let m
  while ((m = re.exec(html)) !== null) {
    const src = m[1]
    if (!/pixel|tracking|stat\.|beacon|1x1|spacer|avatar|icon|logo/i.test(src)) {
      imgs.push(src)
    }
  }
  return [...new Set(imgs)]
}

function weaveImages(text, images) {
  if (images.length === 0) return text
  const paragraphs = text.split('\n\n').filter(p => p.trim())
  if (paragraphs.length === 0) return text

  const mid = Math.max(1, Math.floor(paragraphs.length / 2))
  const result = [
    ...paragraphs.slice(0, mid),
    `[IMAGE:${images[0]}]`,
    ...paragraphs.slice(mid),
  ]
  return result.join('\n\n')
}

// ── Article page scraper (og:image + body images) ────────────────

async function fetchArticleMeta(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GrandTheftInfo-Bot/1.0)',
      },
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) return { ogImage: null, bodyImages: [] }
    const html = await res.text()

    const ogMatch =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/)
    const ogImage = ogMatch ? ogMatch[1] : null

    const bodyImages = extractBodyImages(html)
      .filter(src => src !== ogImage)
      .slice(0, 5)

    console.log(`    og:image: ${ogImage ? 'found' : 'none'}, body images: ${bodyImages.length}`)
    return { ogImage, bodyImages }
  } catch (err) {
    console.warn(`    fetchArticleMeta failed: ${err.message}`)
    return { ogImage: null, bodyImages: [] }
  }
}

// ── GTA 6 relevance filter ────────────────────────────────────────

function isGTA6Related(title) {
  const t = title.toLowerCase()
  return /gta.{0,3}6|gta.{0,3}vi\b|grand theft auto.{0,3}6|grand theft auto.{0,3}vi\b|vice city|leonida/.test(t)
}

// ── Category detection ────────────────────────────────────────────

function detectCategory(title) {
  const t = title.toLowerCase()
  if (/patch|mise.?à.?jour|hotfix|update \d+|v\d+\.\d+/.test(t)) return 'patch'
  if (/weekly|hebdo/.test(t)) return 'weekly_update'
  if (/easter.?egg|secret|caché/.test(t)) return 'easter_egg'
  return 'news'
}

// ── Fetch one source ──────────────────────────────────────────────

async function fetchSource(source) {
  console.log(`Fetching ${source.name}...`)
  try {
    const res = await fetch(source.url, {
      headers: {
        'User-Agent':
          'GrandTheftInfo-RSS/1.0 (+https://gta6-hub-tawny.vercel.app)',
        Accept: source.type === 'reddit-json' ? 'application/json' : 'application/rss+xml, application/xml, text/xml',
      },
      signal: AbortSignal.timeout(12_000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    if (source.type === 'reddit-json') {
      const json = await res.json()
      return parseRedditJson(json)
    }
    const xml = await res.text()
    return parseRSS(xml)
  } catch (err) {
    console.warn(`  ⚠ ${source.name}: ${err.message}`)
    return []
  }
}

// ── Main ──────────────────────────────────────────────────────────

async function main() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }

  // 1. Load existing source_urls to deduplicate
  const { data: existing, error: fetchErr } = await supabase
    .from('articles')
    .select('source_url')
    .not('source_url', 'is', null)

  if (fetchErr) {
    console.error('Supabase error:', fetchErr.message)
    process.exit(1)
  }

  const existingUrls = new Set(existing.map((r) => r.source_url))
  console.log(`${existingUrls.size} source URLs already in DB`)

  // 2. Fetch all sources and build insert list
  const toInsert = []

  for (const source of SOURCES) {
    const items = await fetchSource(source)
    console.log(`  → ${items.length} items fetched`)

    for (const item of items) {
      if (!item.title || !item.link) continue
      if (!isGTA6Related(item.title)) continue
      if (existingUrls.has(item.link)) continue

      const pubDate = item.pubDate
        ? new Date(item.pubDate).toISOString()
        : new Date().toISOString()
      const rawHtml = item.description || item.title
      const rssBodyImages = extractBodyImages(rawHtml)
      const rawContent = stripHtml(rawHtml)
        .replace(/^listen to this\s*/i, '')
        .replace(/listenbutton\w*\s*/gi, '')
        .trim()

      // Scrape article page for og:image + body images
      let cover_image = item.image || null
      let pageBodyImages = []
      if (source.type !== 'reddit-json') {
        const meta = await fetchArticleMeta(item.link)
        if (!cover_image) cover_image = meta.ogImage
        pageBodyImages = meta.bodyImages
      }

      const allBodyImages = [...new Set([...rssBodyImages, ...pageBodyImages])]
      // Fallback: insert cover image midway in content if no body images found
      const imagesToWeave = allBodyImages.length > 0
        ? allBodyImages
        : (cover_image ? [cover_image] : [])
      const contentWithImages = weaveImages(rawContent, imagesToWeave)

      toInsert.push({
        title: item.title.slice(0, 255),
        slug: makeSlug(item.title, pubDate, item.link),
        content: contentWithImages.slice(0, 8000),
        summary: rawContent.slice(0, 200),
        source_url: item.link,
        source_name: source.name,
        category: detectCategory(item.title),
        cover_image,
        published_at: pubDate,
      })

      // Prevent cross-source duplicates within this run
      existingUrls.add(item.link)
    }
  }

  if (toInsert.length === 0) {
    console.log('No new articles — done.')
    return
  }

  console.log(`Inserting ${toInsert.length} new articles...`)

  // 3. Insert in batches of 50
  for (let i = 0; i < toInsert.length; i += 50) {
    const batch = toInsert.slice(i, i + 50)
    const { error: insertErr } = await supabase.from('articles').insert(batch)
    if (insertErr) {
      console.error(`Batch ${Math.floor(i / 50) + 1} error:`, insertErr.message)
      console.error('Slugs:', batch.map((a) => a.slug).join(', '))
    } else {
      console.log(`  ✓ Batch ${Math.floor(i / 50) + 1}: ${batch.length} articles inserted`)
    }
  }

  console.log('Done.')
}

main()

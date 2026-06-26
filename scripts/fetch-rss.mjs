#!/usr/bin/env node
// Daily RSS pipeline: fetch → deduplicate by source_url → insert Sanity
// Requires env: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN

import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const SOURCES = [
  // ── Sources spécialisées GTA ──────────────────────────────────────
  {
    name: 'Rockstar Intel',
    url: 'https://rockstarintel.com/feed/',
    type: 'rss',
  },
  {
    name: 'GTA BOOM',
    url: 'https://www.gtaboom.com/feed/',
    type: 'rss',
    skipGTA6Filter: true,
  },
  // ── Grands médias gaming (EN) ─────────────────────────────────────
  {
    name: 'Push Square',
    url: 'https://www.pushsquare.com/feeds/latest',
    type: 'rss',
  },
  {
    name: 'Video Games Chronicle',
    url: 'https://www.videogameschronicle.com/feed/',
    type: 'rss',
  },
  {
    name: 'Kotaku',
    url: 'https://kotaku.com/rss',
    type: 'rss',
  },
  // ── Médias gaming francophones ────────────────────────────────────
  {
    name: 'ActuGaming',
    url: 'https://actugaming.net/feed/',
    type: 'rss',
  },
  {
    name: 'Gamekult',
    url: 'https://www.gamekult.com/rss.xml',
    type: 'rss',
  },
  {
    name: 'JeuxVideo.com',
    url: 'https://www.jeuxvideo.com/rss/rss.xml',
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

function decodeHtmlEntities(str) {
  return str
    // Entités numériques décimales &#233; → é
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    // Entités numériques hexadécimales &#x00E9; → é
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    // Entités nommées courantes
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&rsquo;|&lsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&hellip;/g, '…')
    .replace(/&eacute;/g, 'é')
    .replace(/&egrave;/g, 'è')
    .replace(/&ecirc;/g, 'ê')
    .replace(/&agrave;/g, 'à')
    .replace(/&acirc;/g, 'â')
    .replace(/&ocirc;/g, 'ô')
    .replace(/&ucirc;/g, 'û')
    .replace(/&ccedil;/g, 'ç')
    .replace(/&oelig;/g, 'œ')
}

function stripHtml(html) {
  return decodeHtmlEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
  )
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
  const plain = itemXml.match(/<link>([^<]+)<\/link>/)
  if (plain) return plain[1].trim()
  const attr = itemXml.match(/<link[^>]+href="([^"]+)"/)
  if (attr) return attr[1].trim()
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
  return [
    ...paragraphs.slice(0, mid),
    `[IMAGE:${images[0]}]`,
    ...paragraphs.slice(mid),
  ].join('\n\n')
}

// ── Article text extractor ────────────────────────────────────────

function extractArticleText(html) {
  // Isoler le conteneur principal de l'article
  let scope = html
  const containers = [
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /class=["'][^"']*(?:article-body|post-body|entry-content|article-content|post-content|story-body|content-body)[^"']*["'][^>]*>([\s\S]*?)(?=<\/(?:div|section|article|main)>)/i,
    /<main[^>]*>([\s\S]*?)<\/main>/i,
  ]
  for (const re of containers) {
    const m = html.match(re)
    if (m) { scope = m[1]; break }
  }

  // Extraire les paragraphes
  const paragraphs = []
  const pRe = /<p[^>]*>([\s\S]*?)<\/p>/gi
  let m
  while ((m = pRe.exec(scope)) !== null) {
    const text = stripHtml(m[1]).trim()
    if (text.length > 40) paragraphs.push(text)
  }
  return paragraphs.join('\n\n')
}

// ── Article page scraper (og:image + body images + body text) ────

async function fetchArticleMeta(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; GrandTheftInfo-Bot/1.0)' },
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) return { ogImage: null, bodyImages: [], bodyText: '' }
    const html = await res.text()

    const ogMatch =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/)
    const ogImage = ogMatch ? ogMatch[1] : null
    const bodyImages = extractBodyImages(html).filter(src => src !== ogImage).slice(0, 5)
    const bodyText = extractArticleText(html)

    console.log(`    og:image: ${ogImage ? 'found' : 'none'}, body images: ${bodyImages.length}, text: ${bodyText.length} chars`)
    return { ogImage, bodyImages, bodyText }
  } catch (err) {
    console.warn(`    fetchArticleMeta failed: ${err.message}`)
    return { ogImage: null, bodyImages: [], bodyText: '' }
  }
}

// ── DeepL translation ─────────────────────────────────────────────

const DEEPL_KEY = process.env.DEEPL_API_KEY
const DEEPL_URL = DEEPL_KEY?.endsWith(':fx')
  ? 'https://api-free.deepl.com/v2/translate'
  : 'https://api.deepl.com/v2/translate'

async function translateToFr(texts) {
  if (!DEEPL_KEY) return texts
  try {
    const res = await fetch(DEEPL_URL, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: texts,
        target_lang: 'FR',
        source_lang: 'EN',
      }),
      signal: AbortSignal.timeout(15_000),
    })
    if (!res.ok) {
      console.warn(`  ⚠ DeepL HTTP ${res.status}`)
      return texts
    }
    const data = await res.json()
    return data.translations.map(t => t.text)
  } catch (err) {
    console.warn(`  ⚠ DeepL failed: ${err.message}`)
    return texts
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
        'User-Agent': 'GrandTheftInfo-RSS/1.0 (+https://gta6-hub-tawny.vercel.app)',
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
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN')
    process.exit(1)
  }

  // 1. Load existing source_urls to deduplicate
  const existing = await sanity.fetch(
    `*[_type == "article" && defined(source_url)] { source_url }`
  )
  const existingUrls = new Set(existing.map((r) => r.source_url))
  console.log(`${existingUrls.size} source URLs already in Sanity`)

  // 2. Fetch all sources and build insert list
  const toInsert = []

  for (const source of SOURCES) {
    const items = await fetchSource(source)
    console.log(`  → ${items.length} items fetched`)

    for (const item of items) {
      if (!item.title || !item.link) continue
      if (!source.skipGTA6Filter && !isGTA6Related(item.title)) continue
      if (existingUrls.has(item.link)) continue

      const pubDate = item.pubDate
        ? new Date(item.pubDate).toISOString()
        : new Date().toISOString()
      const rawHtml = item.description || item.title
      const rssBodyImages = extractBodyImages(rawHtml)
      let rawContent = stripHtml(rawHtml)
        .replace(/^listen to this\s*/i, '')
        .replace(/listenbutton\w*\s*/gi, '')
        .trim()

      let cover_image = item.image || null
      let pageBodyImages = []
      if (source.type !== 'reddit-json') {
        const meta = await fetchArticleMeta(item.link)
        if (!cover_image) cover_image = meta.ogImage
        pageBodyImages = meta.bodyImages
        // Si le RSS ne donne qu'un court extrait, utiliser le texte scrapé de la page
        if (rawContent.length < 500 && meta.bodyText.length > rawContent.length) {
          rawContent = meta.bodyText.slice(0, 8000)
        }
      }

      const allBodyImages = [...new Set([...rssBodyImages, ...pageBodyImages])]
      const imagesToWeave = allBodyImages.length > 0
        ? allBodyImages
        : (cover_image ? [cover_image] : [])
      const contentWithImages = weaveImages(rawContent, imagesToWeave)

      // Traduire titre + contenu en français via DeepL
      const [translatedTitle, translatedContent] = await translateToFr([
        item.title.slice(0, 255),
        contentWithImages.slice(0, 8000),
      ])
      const translatedSummary = translatedContent.replace(/\[IMAGE:[^\]]+\]\n\n?/g, '').slice(0, 200)

      const slug = makeSlug(item.title, pubDate, item.link)

      toInsert.push({
        _type: 'article',
        _id: `rss-${slug}`,
        title: translatedTitle,
        slug: { _type: 'slug', current: slug },
        content: translatedContent,
        summary: translatedSummary,
        source_url: item.link,
        source_name: source.name,
        category: detectCategory(item.title),
        cover_image,
        published_at: pubDate,
      })

      existingUrls.add(item.link)
    }
  }

  if (toInsert.length === 0) {
    console.log('No new articles — done.')
    return
  }

  console.log(`Inserting ${toInsert.length} new articles into Sanity...`)

  // 3. Insert in batches of 50
  for (let i = 0; i < toInsert.length; i += 50) {
    const batch = toInsert.slice(i, i + 50)
    try {
      const transaction = sanity.transaction()
      for (const doc of batch) {
        transaction.createOrReplace(doc)
      }
      await transaction.commit()
      console.log(`  ✓ Batch ${Math.floor(i / 50) + 1}: ${batch.length} articles inserted`)
    } catch (err) {
      console.error(`Batch ${Math.floor(i / 50) + 1} error:`, err.message)
    }
  }

  console.log('Done.')
}

main()

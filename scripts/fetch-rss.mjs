#!/usr/bin/env node
// Daily RSS pipeline: fetch → deduplicate by source_url → insert Sanity
// Requires env: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN

import { createClient } from '@sanity/client'
import { fileURLToPath } from 'url'

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
    name: 'JeuxVideo.com',
    url: 'https://www.jeuxvideo.com/rss/rss.xml',
    type: 'rss',
  },
  // ── Communauté & agrégateurs ──────────────────────────────────────
  {
    name: 'Reddit r/GTA6',
    url: 'https://old.reddit.com/r/GTA6/.rss',
    type: 'rss',
    skipGTA6Filter: true,
    skipArticleScrape: true,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  },
  // ── Médias gaming francophones (supplémentaires) ──────────────────
  {
    name: 'Gamergen',
    url: 'https://www.gamergen.com/rss',
    type: 'rss',
  },
  {
    name: 'Frandroid',
    url: 'https://www.frandroid.com/feed',
    type: 'rss',
  },
  {
    name: 'Tom\'s Guide FR',
    url: 'https://www.tomsguide.fr/feed/',
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

// ── HTML entity decoder ───────────────────────────────────────────
// Map complet : couvre latin-1, latin-ext, typographie, monnaies, maths, grec courant

const HTML_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  // Typographie
  rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“',
  sbquo: '‚', bdquo: '„',
  ndash: '–', mdash: '—', horbar: '―',
  hellip: '…', laquo: '«', raquo: '»',
  lsaquo: '‹', rsaquo: '›',
  bull: '•', middot: '·', permil: '‰',
  prime: '′', Prime: '″',
  dagger: '†', Dagger: '‡',
  trade: '™', copy: '©', reg: '®',
  // Lettres accentuées minuscules
  agrave: 'à', aacute: 'á', acirc: 'â', atilde: 'ã',
  auml: 'ä', aring: 'å', aelig: 'æ',
  ccedil: 'ç',
  egrave: 'è', eacute: 'é', ecirc: 'ê', euml: 'ë',
  igrave: 'ì', iacute: 'í', icirc: 'î', iuml: 'ï',
  eth: 'ð',
  ntilde: 'ñ',
  ograve: 'ò', oacute: 'ó', ocirc: 'ô', otilde: 'õ',
  ouml: 'ö', oslash: 'ø',
  ugrave: 'ù', uacute: 'ú', ucirc: 'û', uuml: 'ü',
  yacute: 'ý', thorn: 'þ', yuml: 'ÿ',
  oelig: 'œ', scaron: 'š', fnof: 'ƒ',
  // Lettres accentuées majuscules
  Agrave: 'À', Aacute: 'Á', Acirc: 'Â', Atilde: 'Ã',
  Auml: 'Ä', Aring: 'Å', AElig: 'Æ',
  Ccedil: 'Ç',
  Egrave: 'È', Eacute: 'É', Ecirc: 'Ê', Euml: 'Ë',
  Igrave: 'Ì', Iacute: 'Í', Icirc: 'Î', Iuml: 'Ï',
  ETH: 'Ð',
  Ntilde: 'Ñ',
  Ograve: 'Ò', Oacute: 'Ó', Ocirc: 'Ô', Otilde: 'Õ',
  Ouml: 'Ö', Oslash: 'Ø',
  Ugrave: 'Ù', Uacute: 'Ú', Ucirc: 'Û', Uuml: 'Ü',
  Yacute: 'Ý', THORN: 'Þ', szlig: 'ß',
  OElig: 'Œ', Scaron: 'Š', Yuml: 'Ÿ',
  // Maths / symboles
  deg: '°', plusmn: '±', sup2: '²', sup3: '³',
  acute: '´', micro: 'µ', para: '¶', middot: '·',
  cedil: '¸', sup1: '¹', ordm: 'º',
  frac14: '¼', frac12: '½', frac34: '¾',
  iexcl: '¡', cent: '¢', pound: '£', curren: '¤',
  yen: '¥', brvbar: '¦', sect: '§', uml: '¨',
  ordf: 'ª', not: '¬', shy: '­', macr: '¯',
  euro: '€', times: '×', divide: '÷', minus: '−',
  infin: '∞', asymp: '≈', ne: '≠', equiv: '≡',
  le: '≤', ge: '≥', sub: '⊂', sup: '⊃',
  // Espaces typographiques
  thinsp: ' ', hairsp: ' ', ensp: ' ', emsp: ' ',
  zwj: '‍', zwnj: '‌', lrm: '‎', rlm: '‏',
  // Grec courant
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ',
  omega: 'ω', pi: 'π',
  Alpha: 'Α', Beta: 'Β', Gamma: 'Γ', Delta: 'Δ',
  Omega: 'Ω',
  // Flèches / divers
  larr: '←', rarr: '→', uarr: '↑', darr: '↓',
  harr: '↔',
  spades: '♠', clubs: '♣', hearts: '♥', diams: '♦',
  iquest: '¿',
}

function decodeHtmlEntities(str) {
  if (!str) return ''
  return str
    // Entités numériques décimales : &#233; → é
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    // Entités numériques hexadécimales : &#x00E9; → é
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    // Entités nommées via le map complet — entité inconnue → supprimée (évite les esperluettes résiduelles)
    .replace(/&([a-zA-Z][a-zA-Z0-9]*);/g, (match, name) => HTML_ENTITIES[name] ?? '')
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
      title: decodeHtmlEntities(extractXmlTag(itemXml, 'title')),
      link: extractLink(itemXml),
      description: extractContentRss(itemXml),
      pubDate: extractXmlTag(itemXml, 'pubDate') || extractXmlTag(itemXml, 'dc:date'),
      image: extractImageRss(itemXml),
    })
  }
  return items
}

// ── Atom feed parser (old.reddit.com, etc.) ──────────────────────

function parseAtom(xml) {
  const items = []
  const entryRe = /<entry[^>]*>([\s\S]*?)<\/entry>/gi
  let m
  while ((m = entryRe.exec(xml)) !== null) {
    const entry = m[1]
    const title = decodeHtmlEntities(extractXmlTag(entry, 'title'))
    const linkMatch = entry.match(/<link[^>]+href=["']([^"']+)["']/)
    const link = linkMatch ? linkMatch[1] : ''
    const pubDate = extractXmlTag(entry, 'published') || extractXmlTag(entry, 'updated')
    const description = extractXmlTag(entry, 'content') || extractXmlTag(entry, 'summary')
    const image = extractImageRss(description)
    if (title && link) items.push({ title, link, description, pubDate, image })
  }
  return items
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

function ensureReadableParagraphs(text, sentencesPerPara = 3) {
  return text
    .split('\n\n')
    .flatMap(block => {
      const trimmed = block.trim()
      if (!trimmed || trimmed.startsWith('[IMAGE:') || trimmed.length < 350) return [trimmed]
      const sentences = trimmed.match(/[^.!?…]+[.!?…]+(?:\s|$)/g) || [trimmed]
      const chunks = []
      for (let i = 0; i < sentences.length; i += sentencesPerPara) {
        const chunk = sentences.slice(i, i + sentencesPerPara).join('').trim()
        if (chunk) chunks.push(chunk)
      }
      return chunks.length > 1 ? chunks : [trimmed]
    })
    .filter(Boolean)
    .join('\n\n')
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

// Patterns qui indiquent un paragraphe parasite (bio journaliste, RGPD, cookies, newsletter…)
const NOISE_PATTERNS = [
  /journaliste|rédact(?:eur|rice)|chef de rubrique|correspondant/i,
  /newsletter|abonnez-vous|inscrivez-vous|boîte aux lettres|vous allez entendre parler/i,
  /données (?:personnelles|transmises)|politique de confidentialité|responsable de traitement/i,
  /vous pouvez vous opposer|droit d['']accès|droit de rectification|portabilité|exercer.*droits/i,
  /ce contenu est bloqué|n['']avez pas accepté|consentez aux finalités|traceurs/i,
  /humanoid|éditeur du site|société éditrice/i,
  /suivez-nous|profil google|ne rien manquer/i,
  /publicité personnalisée|profil publicitaire|mesurer la performance/i,
  /cliquez sur.*désinscription|formulaire de demande|exercer.*droit/i,
  /tous nos articles sont aussi/i,
  /surveillez votre boîte/i,
  /les données transmises/i,
  /en cliquant sur.*j['']accepte/i,
  /vous disposez d['']un droit/i,
  /pour plus d['']informations.*politique/i,
  // CTAs "suivre sur Google News" (GTA BOOM et similaires)
  /votre source préférée|faites de .{0,60} votre source/i,
  /google donne la priorité|top stories|résumés générés par l['']ia/i,
  /pas d['']inscription[.\s]*pas d['']e.?mail|juste une préférence dans la recherche/i,
  /follow us on google|set as your preferred source/i,
]

function isNoiseParagraph(text) {
  if (NOISE_PATTERNS.some(p => p.test(text))) return true
  // Blocs de texte légal très longs sans ponctuation de fin de phrase normale → probablement du bruit
  if (text.length > 600 && !/[.!?]$/.test(text.trim())) return true
  return false
}

function extractArticleText(html) {
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

  const paragraphs = []
  const pRe = /<p[^>]*>([\s\S]*?)<\/p>/gi
  let m
  while ((m = pRe.exec(scope)) !== null) {
    const text = stripHtml(m[1]).trim()
    if (text.length > 40 && !isNoiseParagraph(text)) paragraphs.push(text)
  }
  return paragraphs.join('\n\n')
}

// ── Article page scraper ──────────────────────────────────────────

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

// ── DeepL translation (fallback) ──────────────────────────────────

const DEEPL_KEY = process.env.DEEPL_API_KEY
const DEEPL_URL = DEEPL_KEY?.endsWith(':fx')
  ? 'https://api-free.deepl.com/v2/translate'
  : 'https://api.deepl.com/v2/translate'

async function translateChunk(texts) {
  if (!DEEPL_KEY) return texts
  try {
    const res = await fetch(DEEPL_URL, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: texts, target_lang: 'FR' }),
      signal: AbortSignal.timeout(30_000),
    })
    if (!res.ok) { console.warn(`  ⚠ DeepL HTTP ${res.status}`); return texts }
    const data = await res.json()
    return data.translations.map(t => t.text)
  } catch (err) {
    console.warn(`  ⚠ DeepL failed: ${err.message}`)
    return texts
  }
}

async function translateAllToFr(texts) {
  if (!DEEPL_KEY || texts.length === 0) return texts
  const results = []
  for (let i = 0; i < texts.length; i += 50) {
    const chunk = texts.slice(i, i + 50)
    console.log(`  → DeepL batch ${Math.floor(i / 50) + 1}: ${chunk.length} textes`)
    const translated = await translateChunk(chunk)
    results.push(...translated)
    if (i + 50 < texts.length) await new Promise(r => setTimeout(r, 300))
  }
  return results
}

// ── Gemini editorial rewriting ────────────────────────────────────

const GEMINI_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`

const EDITORIAL_SYSTEM = `Tu es le rédacteur de GTA 6 Hub, média communautaire francophone dédié à GTA VI.
Voix : insider passionné qui parle au nom de la communauté ("on", "nous"). Ton direct, calibré, jamais naïf.
Règles :
- Bannir : "incroyable", "révolutionnaire", superlatifs creux
- Utiliser si pertinent : "Rockstar ne fait rien par hasard", "à lire entre les lignes", "on reste prudents mais"
- Si rumeur : le dire clairement
- Hype assumée mais justifiée par les faits`

const EDITORIAL_PROMPT = (rawTitle, rawContent) =>
  `ARTICLE SOURCE (langue originale) :
Titre : ${rawTitle}
Contenu : ${rawContent.slice(0, 6000)}

MISSION :
1. Traduis en français si nécessaire
2. Réécris avec notre voix éditoriale en suivant cette structure :
   - Accroche (1 phrase qui pose l'enjeu)
   - Corps (faits + ce que ça implique pour le joueur)
   - Verdict "Ce qu'on en pense" (2-3 lignes, notre angle — stocké séparément)

3. Évalue la fiabilité :
   - "officiel" → confirmé par Rockstar
   - "solide" → source crédible ou leak fiable
   - "a-suivre" → rumeur intéressante
   - "speculatif" → théorie communautaire

Retourne UNIQUEMENT ce JSON sans markdown :
{"title":"...","content":"...","verdict":"...","fiabilite":"..."}`

async function rewriteArticle(rawTitle, rawContent) {
  try {
    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: EDITORIAL_SYSTEM }] },
        contents: [{ parts: [{ text: EDITORIAL_PROMPT(rawTitle, rawContent) }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
      }),
      signal: AbortSignal.timeout(30_000),
    })
    if (!res.ok) {
      const err = await res.text()
      console.warn(`  ⚠ Gemini HTTP ${res.status}: ${err.slice(0, 100)}`)
      return null
    }
    const data = await res.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
    const clean = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim()
    return JSON.parse(clean)
  } catch (err) {
    console.warn(`  ⚠ Gemini rewrite failed: ${err.message}`)
    return null
  }
}

async function rewriteAllWithGemini(candidates) {
  console.log(`Réécriture éditoriale avec Gemini (${candidates.length} articles)...`)
  const results = []
  for (let i = 0; i < candidates.length; i++) {
    const a = candidates[i]
    process.stdout.write(`  [${i + 1}/${candidates.length}] ${a._rawTitle.slice(0, 50)}... `)
    const rewritten = await rewriteArticle(a._rawTitle, a._rawContent)
    if (rewritten?.title && rewritten?.content) {
      console.log('✓')
      results.push({ ...rewritten, _ok: true })
    } else {
      console.log('⚠ fallback DeepL')
      results.push({ _ok: false })
    }
    if (i < candidates.length - 1) await new Promise(r => setTimeout(r, 200))
  }
  return results
}

// ── Google News URL resolver ──────────────────────────────────────
// Le RSS Google News ne donne pas de contenu réel — juste des <a href> vers les articles originaux.
// On extrait l'URL réelle et le nom de la source depuis la description/titre.

function extractGoogleNewsRealUrl(descHtml) {
  const m = descHtml.match(/<a[^>]+href=["']([^"']+)["']/)
  return (m && !m[1].includes('google.com')) ? m[1] : null
}

function extractGoogleNewsSourceName(title) {
  const m = title.match(/\s[-–]\s([^-–]+)$/)
  return m ? m[1].trim() : null
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
        'User-Agent': source.userAgent ?? 'GrandTheftInfo-RSS/1.0 (+https://gta6-hub-tawny.vercel.app)',
        Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
      },
      signal: AbortSignal.timeout(12_000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const xml = await res.text()
    // Atom feeds use <entry> elements; RSS 2.0 uses <item>
    if (xml.includes('<feed') && xml.includes('<entry')) return parseAtom(xml)
    return parseRSS(xml)
  } catch (err) {
    console.warn(`  ⚠ ${source.name}: ${err.message}`)
    return []
  }
}

// ── Main ──────────────────────────────────────────────────────────

export async function runPipeline() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN')
    process.exit(1)
  }

  console.log(`Gemini: ${GEMINI_KEY ? '✓ clé présente — réécriture éditoriale activée' : '⚠ GEMINI_API_KEY absente — fallback DeepL'}`)
  console.log(`DeepL: ${DEEPL_KEY ? `clé présente (${DEEPL_URL.includes('free') ? 'plan gratuit' : 'plan pro'})` : '⚠ DEEPL_API_KEY absente'}${!GEMINI_KEY && !DEEPL_KEY ? ' — articles non traduits' : ''}`)

  // 1. Charger les URLs déjà en Sanity pour dédupliquer
  const existing = await sanity.fetch(
    `*[_type == "article" && defined(source_url)] { source_url }`
  )
  const existingUrls = new Set(existing.map((r) => r.source_url))
  console.log(`${existingUrls.size} source URLs already in Sanity`)

  // 2. Collecter les articles candidats (sans traduction pour l'instant)
  const candidates = []

  for (const source of SOURCES) {
    const items = await fetchSource(source)
    console.log(`  → ${items.length} items fetched`)

    for (const item of items) {
      if (!item.title || !item.link) continue

      // Résoudre la vraie URL pour les articles Google News
      if (source.isGoogleNews) {
        const realUrl = extractGoogleNewsRealUrl(item.description || '')
        if (realUrl) {
          item._realSourceName = extractGoogleNewsSourceName(item.title) || source.name
          item.title = item.title.replace(/\s[-–]\s[^-–]+$/, '').trim()
          item.link = realUrl
          item.description = '' // forcer fetchArticleMeta à scraper l'article réel
        }
      }

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
      if (!source.skipArticleScrape) {
        const meta = await fetchArticleMeta(item.link)
        if (!cover_image) cover_image = meta.ogImage
        pageBodyImages = meta.bodyImages
        if (rawContent.length < 500 && meta.bodyText.length > rawContent.length) {
          rawContent = meta.bodyText.slice(0, 8000)
        }
      }

      const allBodyImages = [...new Set([...rssBodyImages, ...pageBodyImages])]
      const imagesToWeave = allBodyImages.length > 0
        ? allBodyImages
        : (cover_image ? [cover_image] : [])
      const readableContent = ensureReadableParagraphs(rawContent)
      const contentWithImages = weaveImages(readableContent, imagesToWeave)

      const slug = makeSlug(item.title, pubDate, item.link)

      candidates.push({
        _rawTitle: item.title.slice(0, 255),
        _rawContent: contentWithImages.slice(0, 8000),
        _type: 'article',
        _id: `rss-${slug}`,
        slug: { _type: 'slug', current: slug },
        source_url: item.link,
        source_name: item._realSourceName || source.name,
        category: detectCategory(item.title),
        cover_image,
        published_at: pubDate,
      })

      existingUrls.add(item.link)
    }
  }

  if (candidates.length === 0) {
    console.log('No new articles — done.')
    return
  }

  console.log(`${candidates.length} new articles to process`)

  // 3. Réécriture éditoriale : Claude-first, DeepL en fallback
  const claudeResults = GEMINI_KEY
    ? await rewriteAllWithGemini(candidates)
    : candidates.map(() => ({ _ok: false }))

  // Identifier les articles qui nécessitent un fallback DeepL
  const needsDeepL = candidates.filter((_, i) => !claudeResults[i]._ok)
  let deepLMap = {}

  if (needsDeepL.length > 0 && DEEPL_KEY) {
    console.log(`Traduction DeepL pour ${needsDeepL.length} articles (fallback)...`)
    const allTexts = needsDeepL.flatMap(a => [a._rawTitle, a._rawContent])
    const translated = await translateAllToFr(allTexts)
    needsDeepL.forEach((a, i) => {
      deepLMap[a._id] = {
        title: translated[i * 2] ?? a._rawTitle,
        content: translated[i * 2 + 1] ?? a._rawContent,
      }
    })
  } else if (needsDeepL.length > 0) {
    console.warn('Aucune clé de traduction — articles conservés en langue originale')
    needsDeepL.forEach(a => {
      deepLMap[a._id] = { title: a._rawTitle, content: a._rawContent }
    })
  }

  // Fusionner les résultats
  candidates.forEach((a, i) => {
    const r = claudeResults[i]
    if (r._ok) {
      a.title = r.title
      a.content = r.content
      a.verdict = r.verdict ?? ''
      a.fiabilite = r.fiabilite ?? 'a-suivre'
    } else {
      const fb = deepLMap[a._id] ?? { title: a._rawTitle, content: a._rawContent }
      a.title = fb.title
      a.content = fb.content
      a.verdict = ''
      a.fiabilite = 'a-suivre'
    }
  })

  // Finaliser les articles (summary, nettoyage champs temporaires)
  const toInsert = candidates.map(({ _rawTitle, _rawContent, ...a }) => ({
    ...a,
    summary: a.content.replace(/\[IMAGE:[^\]]+\]\n\n?/g, '').slice(0, 200),
  }))

  // 4. Insérer dans Sanity par batch de 50
  console.log(`Inserting ${toInsert.length} articles into Sanity...`)

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

// Run directly when called as CLI script
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runPipeline()
}

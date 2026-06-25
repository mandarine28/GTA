import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getArticles, getArticleBySlug } from '@/lib/db'
import type { Metadata } from 'next'

const newsImages = [
  '/images/gameplay1.jpg', '/images/gameplay2.jpg', '/images/gameplay3.jpg',
  '/images/gameplay4.jpg', '/images/gameplay5.jpg', '/images/gameplay6.jpg',
]

function stableFallback(slug: string) {
  let hash = 0
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) & 0xffffffff
  return newsImages[Math.abs(hash) % newsImages.length]
}

const categoryLabel: Record<string, string> = {
  news: 'News',
  patch: 'Patch',
  weekly_update: 'Màj hebdo',
  easter_egg: 'Easter Egg',
}

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: `${article.title} - Grand Theft Info`,
    description: article.summary,
  }
}

function readingTime(content: string) {
  return Math.max(1, Math.round(content.trim().split(/\s+/).length / 200))
}

function slugify(text: string) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function extractHeadings(content: string) {
  return content
    .split('\n\n')
    .filter(b => b.trim().startsWith('## '))
    .map((b, i) => {
      const text = b.trim().slice(3)
      return { text, anchor: slugify(text), index: i + 1 }
    })
}

function renderContent(content: string) {
  return content.split('\n\n').map((block, i) => {
    const trimmed = block.trim()
    if (!trimmed) return null
    if (trimmed.startsWith('## ')) {
      const text = trimmed.slice(3)
      return <h2 key={i} id={slugify(text)}>{text}</h2>
    }
    if (trimmed.startsWith('[IMAGE:') && trimmed.endsWith(']')) {
      const src = trimmed.slice(7, -1)
      return (
        <div key={i} className="relative w-full rounded-xl overflow-hidden my-6" style={{ aspectRatio: '16/9' }}>
          <Image src={src} alt="" fill className="object-cover" />
        </div>
      )
    }
    return <p key={i}>{trimmed}</p>
  })
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [article, allArticles] = await Promise.all([getArticleBySlug(slug), getArticles()])
  if (!article) notFound()

  const minutes = readingTime(article.content)
  const coverImg = article.cover_image || stableFallback(article.slug)
  const related = allArticles.filter(a => a.slug !== slug).slice(0, 3)
  const headings = extractHeadings(article.content)

  return (
    <>
      <a href="#article-content" className="skip-link">Aller au contenu</a>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="mb-8">
          <ol className="flex items-center gap-2 text-sm flex-wrap" style={{ color: 'var(--text-muted)' }}>
            <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/news" className="hover:text-white transition-colors">News</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-white truncate max-w-xs" aria-current="page">{article.title}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-[200px_1fr_260px] gap-10">

          {/* TOC — left */}
          {headings.length > 0 && (
            <aside className="hidden lg:block" aria-label="Résumé de l'article">
              <div className="sticky top-24">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.18em] mb-3 pb-3"
                  style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}
                >
                  Résumé
                </p>
                <nav>
                  <ol className="space-y-0.5">
                    {headings.map((h) => (
                      <li key={h.anchor}>
                        <a href={`#${h.anchor}`} className="toc-link">
                          <span className="toc-num">{h.index}</span>
                          <span className="leading-snug">{h.text}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            </aside>
          )}

          {/* No headings: span the article across left+center */}
          {headings.length === 0 && <div className="hidden lg:block" />}

          {/* Article */}
          <article id="article-content">
            {/* Cover image */}
            <div className="relative rounded-2xl overflow-hidden mb-8" style={{ aspectRatio: '16/9' }}>
              <Image
                src={coverImg}
                alt={`Illustration : ${article.title}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(8,30,54,0.65) 0%, transparent 55%)' }} />
              <span
                className="absolute top-4 left-4 text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full"
                style={{ background: 'var(--accent-gold)', color: '#081E36' }}
              >
                {categoryLabel[article.category]}
              </span>
            </div>

            {/* Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-black leading-tight text-white mb-5">
                {article.title}
              </h1>
              <p className="text-xl leading-relaxed mb-6" style={{ color: 'var(--text-warm)', opacity: 0.85 }}>
                {article.summary}
              </p>
              <div
                className="flex items-center gap-3 flex-wrap pb-6 text-sm"
                style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}
              >
                <span className="font-semibold" style={{ color: 'var(--accent-gold)' }}>
                  {article.source_name}
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={article.published_at}>
                  {new Date(article.published_at).toLocaleDateString('fr-FR', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </time>
                <span aria-hidden="true">·</span>
                <span>{minutes} min de lecture</span>
              </div>
            </header>

            {/* Body */}
            <div className="article-body">
              {renderContent(article.content)}
            </div>

            {/* Source link */}
            {article.source_url && (
              <div
                className="mt-10 pt-6 flex items-center justify-between flex-wrap gap-4"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Source : <strong className="text-white">{article.source_name}</strong>
                </p>
                <a
                  href={article.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold px-4 py-2 rounded-xl transition-all hover:opacity-80"
                  style={{ background: 'var(--bg-card)', color: 'var(--accent-gold)', border: '1px solid var(--border)' }}
                >
                  Article original
                </a>
              </div>
            )}
          </article>

          {/* Right sidebar — related */}
          <aside aria-label="Articles connexes">
            <div className="sticky top-24">
              <p
                className="text-xs font-black tracking-[0.2em] uppercase mb-5"
                style={{ color: 'var(--accent-gold)' }}
              >
                A lire aussi
              </p>
              <div className="space-y-3">
                {related.map((rel, idx) => (
                  <Link
                    key={rel.id}
                    href={`/news/${rel.slug}`}
                    className="group flex gap-3 rounded-xl p-3 transition-all hover:border-yellow-400/40"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                  >
                    <div
                      className="relative rounded-lg overflow-hidden flex-shrink-0"
                      style={{ width: 64, height: 64 }}
                    >
                      <Image
                        src={newsImages[(idx + 3) % newsImages.length]}
                        alt=""
                        fill
                        className="object-cover"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: 'var(--accent-gold)' }}
                      >
                        {categoryLabel[rel.category]}
                      </span>
                      <p className="text-sm font-semibold text-white leading-snug mt-0.5 line-clamp-2">
                        {rel.title}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        {new Date(rel.published_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </>
  )
}

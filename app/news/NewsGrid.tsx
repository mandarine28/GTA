'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Article } from '@/types'

const categoryLabel: Record<string, string> = {
  news: 'News',
  patch: 'Patch',
  weekly_update: 'Màj hebdo',
  easter_egg: 'Easter Egg',
}

const FILTERS = [
  { key: 'tous', label: 'TOUS' },
  { key: 'news', label: 'NEWS' },
  { key: 'patch', label: 'PATCH' },
  { key: 'easter_egg', label: 'EASTER EGG' },
  { key: 'weekly_update', label: 'WEEKLY' },
]

const IMAGES = [
  '/images/gameplay1.jpg', '/images/gameplay2.jpg', '/images/gameplay3.jpg',
  '/images/gameplay4.jpg', '/images/gameplay5.jpg', '/images/gameplay6.jpg',
]

function readingTime(content: string) {
  return Math.max(1, Math.round(content.trim().split(/\s+/).length / 200))
}

function ArticleCard({
  article,
  idx,
  className = '',
  titleSize = 'text-base',
}: {
  article: Article
  idx: number
  className?: string
  titleSize?: string
}) {
  const img = article.cover_image || IMAGES[idx % IMAGES.length]
  const mins = readingTime(article.content)

  return (
    <Link
      href={`/news/${article.slug}`}
      className={`group relative rounded-2xl overflow-hidden block ${className}`}
    >
      <Image
        src={img}
        alt={article.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(0deg, rgba(8,20,40,0.97) 0%, rgba(8,20,40,0.4) 55%, transparent 100%)' }}
      />
      <span
        className="absolute top-4 left-4 text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full"
        style={{ background: 'var(--accent-gold)', color: '#081E36' }}
      >
        {categoryLabel[article.category]}
      </span>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h2 className={`font-black text-white uppercase leading-tight mb-2 ${titleSize}`}>
          {article.title}
        </h2>
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span>{new Date(article.published_at).toLocaleDateString('fr-FR')}</span>
          <span aria-hidden="true">·</span>
          <span>{mins} min</span>
        </div>
      </div>
    </Link>
  )
}

export default function NewsGrid({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState('tous')

  const filtered = active === 'tous'
    ? articles
    : articles.filter(a => a.category === active)

  const [hero, secondary, ...rest] = filtered

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className="text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full transition-all"
            style={
              active === f.key
                ? { background: 'var(--accent-gold)', color: '#081E36' }
                : { background: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border)' }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-24 text-center" style={{ color: 'var(--text-muted)' }}>
          Aucun article dans cette catégorie.
        </p>
      )}

      {/* Hero row */}
      {(hero || secondary) && (
        <div className="grid lg:grid-cols-[3fr_2fr] gap-5 mb-5">
          {hero && (
            <ArticleCard article={hero} idx={0} className="h-[420px]" titleSize="text-2xl" />
          )}
          {secondary && (
            <ArticleCard article={secondary} idx={1} className="h-[420px]" titleSize="text-lg" />
          )}
        </div>
      )}

      {/* Bottom row */}
      {rest.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((article, i) => (
            <ArticleCard
              key={article.id}
              article={article}
              idx={i + 2}
              className="h-[280px]"
              titleSize="text-base"
            />
          ))}
        </div>
      )}
    </div>
  )
}

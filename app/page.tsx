import Link from 'next/link'
import Image from 'next/image'
import { mockArticles, mockWeeklyUpdate } from '@/lib/mock-data'
import Countdown from '@/components/ui/Countdown'

const newsImages = ['/images/gameplay1.jpg', '/images/gameplay2.jpg', '/images/gameplay3.jpg']

export default function HomePage() {
  const latestArticles = mockArticles.slice(0, 3)
  const update = mockWeeklyUpdate

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image src="/images/hero-bg.jpg" alt="GTA 6 Hero" fill className="object-cover object-center" priority />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(11,10,8,0.92) 0%, rgba(11,10,8,0.6) 50%, rgba(11,10,8,0.2) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(11,10,8,1) 0%, transparent 40%)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-0 items-center">
          <div className="max-w-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/gta6-logo.svg" alt="GTA VI" className="mb-5 w-24 h-auto" aria-hidden="true" />
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--accent-gold)' }}>
              La référence francophone
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6">
              TOUT SUR<br />
              <span style={{ color: 'var(--accent-gold)' }}>GTA VI</span>
            </h1>
            <p className="text-lg mb-6" style={{ color: 'var(--text-warm)', opacity: 0.8 }}>
              News, mises à jour hebdomadaires, base de données complète, comparateur et outils.
            </p>

            <div className="mb-8">
              <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
                Sortie dans
              </p>
              <Countdown />
            </div>

            <div className="flex gap-3">
              <Link
                href="/news"
                className="btn-gold px-6 py-3 rounded-xl font-bold text-sm"
                style={{ background: 'var(--accent-gold)', color: '#081E36' }}
              >
                Dernières news
              </Link>
              <Link
                href="/weekly"
                className="btn-outline px-6 py-3 rounded-xl font-bold text-sm border"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--text-warm)' }}
              >
                Màj de la semaine
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block h-[90vh]">
            <div className="absolute inset-6 rounded-[2.5rem] overflow-hidden">
              <Image src="/images/hero-char.png" alt="GTA 6 Character" fill className="object-contain object-center" />
            </div>
          </div>
        </div>
      </section>

      {/* MÀJ HEBDO */}
      <section className="py-20 px-4" style={{ background: 'rgba(8,20,40,0.6)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--accent-gold)' }}>Cette semaine</p>
              <h2 className="text-3xl font-black">Mise à jour GTA Online</h2>
            </div>
            <Link href="/weekly" className="text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: 'var(--accent-gold)' }}>
              Voir tout →
            </Link>
          </div>

          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'var(--bg-card)' }}>
            <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
                Semaine du {new Date(update.week_start).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <p style={{ color: 'var(--text-warm)' }}>{update.summary}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { label: 'Bonus', content: update.bonuses.map((b, i) => <p key={i} className="text-sm text-white">{b.name} <span className="font-bold" style={{ color: '#22c55e' }}>{b.multiplier}</span></p>) },
                { label: 'Nouveaux véhicules', content: update.vehicles.filter(v => v.new).map((v, i) => <p key={i} className="text-sm text-white">{v.name}</p>) },
                { label: 'Réductions', content: update.vehicles.filter(v => v.discount).map((v, i) => <p key={i} className="text-sm text-white">{v.name} <span className="font-bold text-red-400">-{v.discount}%</span></p>) },
                { label: 'Events', content: update.events.map((e, i) => <p key={i} className="text-sm text-white">{e.name}</p>) },
              ].map((col, i) => (
                <div key={i} className="p-5 border-r last:border-r-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--accent-gold)' }}>{col.label}</p>
                  <div className="space-y-1">{col.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DERNIÈRES NEWS */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--accent-gold)' }}>Actualités</p>
              <h2 className="text-3xl font-black">Dernières news</h2>
            </div>
            <Link href="/news" className="text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: 'var(--accent-gold)' }}>
              Toutes les news →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {latestArticles.map((article, idx) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="group relative rounded-2xl overflow-hidden block" style={{ background: 'var(--bg-card)' }}>
                <div className="relative h-48 overflow-hidden">
                  <Image src={newsImages[idx] || '/images/gameplay1.jpg'} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(38,33,52,1) 0%, transparent 60%)' }} />
                  <span className="absolute top-3 left-3 text-xs font-bold tracking-widest uppercase px-2 py-1 rounded-md" style={{ background: 'var(--accent-gold)', color: '#0b0a08' }}>
                    {article.category.replace('_', ' ')}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-white mb-2 group-hover:opacity-80 transition-opacity leading-snug">{article.title}</h3>
                  <p className="text-sm line-clamp-2 mb-4" style={{ color: 'var(--text-muted)' }}>{article.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{article.source_name}</span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{new Date(article.published_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OUTILS */}
      <section className="py-20 px-4" style={{ background: 'rgba(8,20,40,0.6)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--accent-gold)' }}>Outils</p>
            <h2 className="text-3xl font-black">Explore la plateforme</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: '/cheats', img: '/images/gameplay3.jpg', label: 'Codes de triche', desc: 'PS5, Xbox, PC' },
              { href: '/database/vehicles', img: '/images/gameplay4.jpg', label: 'Véhicules', desc: 'Stats et prix complets' },
              { href: '/business-calc', img: '/images/gameplay5.jpg', label: 'Business GTA Online', desc: 'Revenu/heure par activité' },
              { href: '/compare', img: '/images/gameplay6.jpg', label: 'Comparateur', desc: 'Véhicules et armes' },
            ].map((tool) => (
              <Link key={tool.href} href={tool.href} className="group relative rounded-2xl overflow-hidden block transition-all hover:scale-[1.02]" style={{ background: 'var(--bg-card)', aspectRatio: '4/3' }}>
                <Image src={tool.img} alt={tool.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(8,30,54,0.95) 0%, rgba(8,30,54,0.4) 55%, transparent 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-bold text-white text-sm mb-0.5">{tool.label}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

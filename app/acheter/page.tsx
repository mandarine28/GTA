import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Countdown from '@/components/ui/Countdown'

export const metadata: Metadata = {
  title: 'Précommander GTA VI - Grand Theft Info',
  description: 'Précommandez Grand Theft Auto VI dès maintenant. Disponible le 19 novembre 2026 sur PS5 et Xbox Series.',
}

const retailers = [
  { name: 'amazon', display: 'amazon', href: '#', style: { fontFamily: 'Arial, sans-serif', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' } },
  { name: 'cultura', display: 'Cultura®', href: '#', style: { fontSize: '1.25rem', fontWeight: 600 } },
  { name: 'micromania', display: 'Micromania', href: '#', style: { fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' as const } },
  { name: 'rue-du-commerce', display: 'Rue du\nCommerce', href: '#', style: { fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase' as const, lineHeight: 1.2, textAlign: 'center' as const } },
  { name: 'cdiscount', display: 'Cdiscount®', href: '#', style: { fontSize: '1.15rem', fontWeight: 700 } },
  { name: 'leclerc', display: 'E.Leclerc ®', href: '#', style: { fontSize: '1.1rem', fontWeight: 600 } },
  { name: 'fnac', display: 'fnac', href: '#', style: { fontFamily: 'Arial, sans-serif', fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em' } },
  { name: 'gmg', display: '🎮 green man\ngaming', href: '#', style: { fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.3, textAlign: 'center' as const } },
]

const infoLinks = [
  { label: 'HISTOIRE', href: '/characters', img: '/images/gameplay1.jpg' },
  { label: 'ÉDITIONS', href: '/config', img: '/images/gameplay3.jpg' },
  { label: 'SORTIE', href: '/news', img: '/images/gameplay5.jpg' },
]

const trailers = [
  {
    title: 'Bande-annonce 2 de\nGrand Theft Auto VI',
    date: '6 mai 2025',
    img: '/images/gameplay2.jpg',
    href: '/media/trailers',
  },
  {
    title: 'Bande-annonce 1 de\nGrand Theft Auto VI',
    date: '4 Décembre 2023',
    img: '/images/gameplay4.jpg',
    href: '/media/trailers',
  },
]

export default function AcheterPage() {
  return (
    <div>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <Image src="/images/hero-bg.jpg" alt="GTA VI" fill className="object-cover object-center" priority />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(6,15,28,0.55) 0%, rgba(6,15,28,0.7) 60%, rgba(6,15,28,1) 100%)' }} />

        <div className="relative z-10 px-4 py-24 w-full max-w-2xl mx-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/gta6-logo.svg" alt="Grand Theft Auto VI" className="w-28 h-auto mx-auto mb-6" />

          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            PRÉCOMMANDER<br />
            <span>GRAND THEFT AUTO VI</span>
          </h1>

          <p className="text-sm font-black tracking-[0.25em] uppercase mb-2" style={{ color: '#F0A030' }}>
            Disponible le 19 novembre 2026
          </p>
          <p className="text-xs mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
            (Les précommandes seront disponibles bientôt !)
          </p>

          <div className="flex justify-center mb-8">
            <Countdown />
          </div>

          <a
            href="#retailers"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm transition-all hover:opacity-90"
            style={{ background: '#E8376A', color: '#fff' }}
          >
            Précommander
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── OÙ PRÉCOMMANDER ── */}
      <section id="retailers" className="py-14 px-4" style={{ background: 'var(--bg-deep, #060f1c)' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-black tracking-[0.25em] uppercase mb-8" style={{ color: 'var(--text-muted)' }}>
            Où précommander ?
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {retailers.map((r) => (
              <a
                key={r.name}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-6 rounded-xl transition-all hover:border-white/20"
                style={{ background: 'var(--bg-card, #0F2840)', border: '1px solid rgba(255,255,255,0.07)', minHeight: 80 }}
              >
                <span className="text-white whitespace-pre-line" style={r.style}>
                  {r.display}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FICHE JEU ── */}
      <section className="py-14 px-4" style={{ background: 'rgba(8,20,40,0.6)' }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-[280px_1fr] gap-10 items-start">

          {/* Cover */}
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4] w-full max-w-[240px] mx-auto md:mx-0">
            <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #0d1b4b 100%)' }} />
            <Image src="/images/gameplay2.jpg" alt="GTA VI Cover" fill className="object-cover opacity-80" />
            <div className="absolute inset-0 rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
            <div className="absolute bottom-3 left-3">
              <div className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded" style={{ background: '#003087', color: 'white' }}>PS5</div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h2 className="text-2xl font-black tracking-tight mb-6 pb-3" style={{ borderBottom: '2px solid rgba(255,255,255,0.12)' }}>
              GRAND THEFT AUTO VI
            </h2>

            <table className="w-full text-sm mb-6">
              <tbody>
                {[
                  { key: 'Sortie', val: '19 novembre 2026' },
                  { key: 'Plateforme', val: 'PS5, Xbox Series' },
                  { key: 'Développeur', val: 'Rockstar Games' },
                  { key: 'Éditeur', val: 'Rockstar Games' },
                  { key: 'Distributeur', val: 'Take-Two Interactive' },
                ].map((row) => (
                  <tr key={row.key} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td className="py-2.5 pr-6 font-bold text-xs tracking-widest uppercase w-36" style={{ color: 'var(--text-muted)' }}>{row.key}</td>
                    <td className="py-2.5 text-xs font-semibold tracking-wider uppercase" style={{ color: '#F0A030' }}>{row.val}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Jason et Lucia ont toujours su que la vie ne leur ferait pas de cadeau. Mais lorsque les choses tournent mal, ils découvrent le côté obscur de la région la plus ensoleillée d'Amérique, et se retrouvent au cœur d'un complot criminel qui s'étend dans tout l'État de Leonida. Ils devront plus que jamais compter l'un sur l'autre pour espérer s'en sortir.
            </p>

            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
              Ajouter à votre liste de souhaits :
            </p>
            <div className="flex gap-3">
              <a href="#" className="px-4 py-2 rounded-lg text-xs font-black tracking-wide uppercase transition-all hover:opacity-80" style={{ background: '#003087', color: '#fff' }}>
                PS5
              </a>
              <a href="#" className="px-4 py-2 rounded-lg text-xs font-black tracking-wide uppercase transition-all hover:opacity-80" style={{ background: '#107C10', color: '#fff' }}>
                Xbox S
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRAILERS ── */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-black tracking-[0.25em] uppercase mb-8" style={{ color: 'var(--text-muted)' }}>
            Les trailers
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {trailers.map((t) => (
              <Link key={t.title} href={t.href} className="group flex gap-4 rounded-2xl overflow-hidden transition-all hover:opacity-90" style={{ background: 'var(--bg-card, #0F2840)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="relative w-36 flex-shrink-0">
                  <Image src={t.img} alt={t.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/gta6-logo.svg" alt="" className="absolute top-2 left-2 w-8 h-auto" aria-hidden="true" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-bold text-sm leading-snug text-white mb-2 whitespace-pre-line">{t.title}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLUS D'INFORMATIONS ── */}
      <section className="py-14 px-4" style={{ background: 'rgba(8,20,40,0.6)' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-black tracking-[0.25em] uppercase mb-8" style={{ color: 'var(--text-muted)' }}>
            Plus d&apos;informations
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {infoLinks.map((item) => (
              <Link key={item.label} href={item.href} className="group relative rounded-2xl overflow-hidden block" style={{ aspectRatio: '4/3' }}>
                <Image src={item.img} alt={item.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(6,15,28,0.85) 0%, rgba(6,15,28,0.2) 60%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                  <span className="font-black tracking-widest text-sm uppercase text-white">{item.label}</span>
                  <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center group-hover:border-white transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION EDITO ── */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
            <Image src="/images/gameplay6.jpg" alt="GTA VI" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight mb-5">
              GTA VI : un jeu fait pour durer
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
              <p>
                GTA VI sortira en novembre 2026, + de 13 ans après la sortie de GTA V, la version précédente de la série Grand Theft Auto.
              </p>
              <p>
                Rockstar Games est sans aucun doute soucieux de fournir le meilleur jeu possible et on peut s'attendre à une véritable expérience vidéoludique.
              </p>
              <p>
                Premièrement annoncé aux alentours de 100 dollars à sa sortie, le prix de GTA VI devrait finalement être conforme aux standards actuels de l'industrie, à savoir aux alentours de 70 à 80 euros, pour le plus grand plaisir des joueurs, impatients de pouvoir se le procurer.
              </p>
              <p>
                Mettez cette page en favori pour pouvoir précommander le jeu dès que cela sera possible (début 2026 probablement) ou pour l'acheter auprès de votre boutique favorite.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="#retailers"
                className="inline-flex px-6 py-3 rounded-xl font-medium text-sm transition-all hover:opacity-90"
                style={{ background: '#E8376A', color: '#fff' }}
              >
                Voir où précommander
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

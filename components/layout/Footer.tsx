'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const RELEASE_DATE = new Date('2026-11-19T00:00:00')

function useCountdown(target: Date) {
  const [mounted, setMounted] = useState(false)
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    setMounted(true)
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now())
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])
  return { ...t, mounted }
}

const navColumns = [
  {
    title: 'GTA VI',
    links: [
      { label: 'Accueil', href: '/' },
      { label: 'Carte', href: '/map' },
      { label: 'Personnages', href: '/characters' },
      { label: 'Véhicules', href: '/database/vehicles' },
      { label: 'Patch Notes', href: '/patch-notes' },
    ],
  },
  {
    title: 'ACTUALITÉS',
    links: [
      { label: 'News', href: '/news' },
      { label: 'MàJ Hebdomadaire', href: '/weekly' },
      { label: 'Trailers', href: '/media/trailers' },
      { label: 'Screenshots', href: '/media/screenshots' },
    ],
  },
  {
    title: 'GUIDES',
    links: [
      { label: 'Missions', href: '/missions' },
      { label: 'Easter Eggs', href: '/easter-eggs' },
      { label: 'Codes de triche', href: '/cheats' },
      { label: 'Config PC', href: '/config' },
    ],
  },
  {
    title: 'À PROPOS',
    links: [
      { label: 'Précommander', href: '/acheter' },
      { label: 'Shark Cards', href: '/sharkcard' },
      { label: 'Argent GTA', href: '/money' },
    ],
  },
]

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black tabular-nums"
        style={{ background: 'rgba(240,192,64,0.12)', border: '1px solid rgba(240,192,64,0.25)', color: 'var(--accent-gold)' }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-[10px] font-bold tracking-widest uppercase mt-2" style={{ color: 'var(--text-muted)' }}>
        {label}
      </span>
    </div>
  )
}

export default function Footer() {
  const { days, hours, minutes, seconds, mounted } = useCountdown(RELEASE_DATE)

  return (
    <footer style={{ background: '#060f1c', borderTop: '1px solid rgba(255,255,255,0.06)' }}>

      {/* PRÉCOMMANDE CTA */}
      <div className="px-4 py-16" style={{ background: 'linear-gradient(180deg, rgba(240,192,64,0.04) 0%, transparent 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--accent-gold)' }}>
            Disponible le 19 novembre 2026
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8">
            PRÉCOMMANDER GTA VI<br />
            <span style={{ color: 'var(--accent-gold)' }}>DÈS MAINTENANT</span>
          </h2>

          <div
            className="flex items-start justify-center gap-4 mb-10"
            style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.3s' }}
          >
            <CountUnit value={days} label="Jours" />
            <span className="text-2xl font-black mt-4" style={{ color: 'var(--accent-gold)' }}>:</span>
            <CountUnit value={hours} label="Heures" />
            <span className="text-2xl font-black mt-4" style={{ color: 'var(--accent-gold)' }}>:</span>
            <CountUnit value={minutes} label="Min" />
            <span className="text-2xl font-black mt-4" style={{ color: 'var(--accent-gold)' }}>:</span>
            <CountUnit value={seconds} label="Sec" />
          </div>

          <Link
            href="/acheter"
            className="inline-flex px-8 py-4 rounded-xl font-medium text-sm tracking-wide transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: '#E8376A', color: '#fff' }}
          >
            Précommander GTA VI
          </Link>
        </div>
      </div>

      {/* LIENS */}
      <div className="px-4 py-14" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-[auto_1fr_1fr_1fr_1fr] gap-10 md:gap-6">

          {/* Logo + tagline */}
          <div className="col-span-2 md:col-span-1 md:pr-8">
            <Link href="/" className="inline-block mb-3">
              <span
                className="text-2xl leading-none"
                style={{ fontFamily: "'Pricedown', var(--font-barlow)", letterSpacing: '0.01em' }}
              >
                <span className="text-white">grand theft </span>
                <span style={{ color: 'var(--accent-gold)' }}>info</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              La référence francophone sur GTA VI. News, guides, base de données et outils pour les joueurs.
            </p>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent-gold)' }}>
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-2xl p-6 mb-6"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
              Disclaimer
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Grand Theft Info est un site non officiel, créé par des fans et non affilié à Rockstar Games, Take-Two Interactive ou leurs partenaires. GTA, Grand Theft Auto et tous les logos associés sont des marques déposées de Take-Two Interactive Software, Inc. Toutes les images, noms et contenus appartenant à Rockstar Games sont utilisés à des fins informationnelles uniquement dans le cadre du fair use.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              © 2026 Grand Theft Info. Tous droits réservés.
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Site non officiel — non affilié à Rockstar Games
            </p>
          </div>
        </div>
      </div>

    </footer>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef } from 'react'

const menu = [
  {
    label: 'Actualités',
    href: '/news',
    image: '/images/gameplay1.jpg',
    columns: [
      {
        title: 'News',
        links: [
          { href: '/news', label: 'Toutes les news', desc: "Actu en temps réel" },
          { href: '/news?cat=leaks', label: 'Leaks & Rumeurs', desc: "Ce qu'on sait déjà" },
          { href: '/weekly', label: 'Màj hebdomadaire', desc: 'Ce qui change cette semaine' },
          { href: '/patch-notes', label: 'Patch Notes', desc: 'Historique des mises à jour' },
        ],
      },
    ],
  },
  {
    label: 'Jeu',
    href: '/game',
    image: '/images/gameplay2.jpg',
    columns: [
      {
        title: 'Informations',
        links: [
          { href: '/game', label: 'Histoire & Personnages', desc: 'Jason, Lucia et le cast' },
          { href: '/config', label: 'Éditions', desc: 'Standard, Deluxe, Ultimate' },
          { href: '/map', label: 'Carte de Vice City', desc: 'Explorez le monde' },
        ],
      },
    ],
  },
  {
    label: 'Guides',
    href: '/cheats',
    image: '/images/gameplay3.jpg',
    columns: [
      {
        title: 'Astuces',
        links: [
          { href: '/cheats', label: 'Codes de triche', desc: 'PS5, Xbox, PC' },
          { href: '/glitches', label: 'Glitches', desc: 'Actifs et vérifiés' },
          { href: '/money', label: "Gagner de l'argent", desc: 'Meilleures méthodes $/h' },
          { href: '/easter-eggs', label: 'Easter Eggs', desc: 'Secrets et références' },
        ],
      },
    ],
  },
  {
    label: 'Base de données',
    href: '/database/vehicles',
    image: '/images/gameplay4.jpg',
    columns: [
      {
        title: 'Inventaire',
        links: [
          { href: '/database/vehicles', label: 'Véhicules', desc: 'Stats et prix complets' },
          { href: '/database/weapons', label: 'Armes', desc: 'Dégâts, portée, cadence' },
          { href: '/compare', label: 'Comparateur', desc: 'Côte à côte' },
        ],
      },
    ],
  },
  {
    label: 'Outils',
    href: '/business-calc',
    image: '/images/gameplay5.jpg',
    columns: [
      {
        title: 'Calculateurs',
        links: [
          { href: '/business-calc', label: 'Business GTA Online', desc: 'Revenu/heure par activité' },
          { href: '/sharkcard', label: 'Shark Cards', desc: 'Grind vs argent réel' },
        ],
      },
    ],
  },
  {
    label: 'Médias',
    href: '/media/trailers',
    image: '/images/gameplay6.jpg',
    columns: [
      {
        title: 'Galerie',
        links: [
          { href: '/media/screenshots', label: 'Screenshots & Artworks', desc: 'Images officielles HD' },
          { href: '/media/trailers', label: 'Trailers', desc: 'Toutes les vidéos' },
        ],
      },
    ],
  },
]

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveMenu(label)
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150)
  }

  return (
    <nav className="sticky top-0 z-50" style={{ background: 'rgba(8,30,54,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0" onClick={() => setActiveMenu(null)}>
          <span
            className="text-xl leading-none"
            style={{ fontFamily: "'Pricedown', var(--font-barlow)", letterSpacing: '0.01em' }}
          >
            <span className="text-white">grand theft </span>
            <span style={{ color: 'var(--accent-gold)' }}>info</span>
          </span>
        </Link>

        {/* Nav items */}
        <div className="hidden md:flex items-center gap-0">
          {menu.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => handleEnter(item.label)}
              onMouseLeave={handleLeave}
            >
              <Link
                href={item.href}
                onClick={() => setActiveMenu(null)}
                className="flex items-center gap-1 px-4 h-16 text-sm font-semibold transition-colors"
                style={{ color: activeMenu === item.label ? 'var(--accent-gold)' : 'rgba(255,255,255,0.8)' }}
              >
                {item.label}
                <svg
                  className="w-3 h-3 opacity-50 transition-transform"
                  style={{ transform: activeMenu === item.label ? 'rotate(180deg)' : 'none' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {/* Dropdown */}
              {activeMenu === item.label && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-1 min-w-[280px]"
                  onMouseEnter={() => handleEnter(item.label)}
                  onMouseLeave={handleLeave}
                >
                  <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#0A1E33', border: '1px solid rgba(240,192,64,0.2)' }}>
                    {item.columns.map((col) => (
                      <div key={col.title} className="p-3">
                        <p className="text-xs font-black tracking-[0.2em] uppercase px-2 pb-2" style={{ color: 'var(--accent-gold)' }}>
                          {col.title}
                        </p>
                        <div className="space-y-0.5">
                          {col.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setActiveMenu(null)}
                              className="flex items-start px-3 py-2.5 rounded-xl transition-all"
                              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(240,192,64,0.08)')}
                              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                            >
                              <div>
                                <p className="text-sm font-semibold text-white leading-tight">{link.label}</p>
                                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{link.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Dropdown image banner */}
                    <div className="relative mx-3 mb-3 rounded-xl overflow-hidden" style={{ height: 96 }}>
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover"
                        aria-hidden="true"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(0deg, rgba(8,20,40,0.6) 0%, transparent 60%)' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/acheter"
          className="hidden md:inline-flex px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90 hover:scale-[1.02]"
          style={{ background: '#E8376A', color: '#fff' }}
          onClick={() => setActiveMenu(null)}
        >
          Précommander
        </Link>
      </div>
    </nav>
  )
}

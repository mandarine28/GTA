'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

type NavLink = { href: string; label: string; desc: string; soon?: true }
type NavSection = { label: string; href: string; image: string; links: NavLink[] }

const menu: NavSection[] = [
  {
    label: 'Actualités',
    href: '/news',
    image: '/images/gameplay1.jpg',
    links: [
      { href: '/news', label: 'Toutes les news', desc: 'Actu en temps réel' },
      { href: '/news?cat=leaks', label: 'Leaks & Rumeurs', desc: "Ce qu'on sait déjà" },
      { href: '/weekly', label: 'Màj hebdomadaire', desc: 'Ce qui change cette semaine' },
      { href: '/patch-notes', label: 'Patch Notes', desc: 'Historique des mises à jour' },
    ],
  },
  {
    label: 'Jeu',
    href: '/game',
    image: '/images/gameplay2.jpg',
    links: [
      { href: '/game', label: 'Histoire & Synopsis', desc: 'Scénario, univers, infos clés' },
      { href: '/characters', label: 'Personnages', desc: 'Jason, Lucia et le cast complet' },
      { href: '/config', label: 'Éditions', desc: 'Standard & Ultime' },
      { href: '/map', label: 'Régions de Leonida', desc: 'Vice City, Keys, Grassrivers…' },
    ],
  },
  {
    label: 'Guides',
    href: '/cheats',
    image: '/images/gameplay3.jpg',
    links: [
      { href: '/cheats', label: 'Codes de triche', desc: 'PS5, Xbox, PC', soon: true },
      { href: '/glitches', label: 'Glitches', desc: 'Actifs et vérifiés', soon: true },
      { href: '/money', label: "Gagner de l'argent", desc: 'Meilleures méthodes $/h', soon: true },
      { href: '/easter-eggs', label: 'Easter Eggs', desc: 'Secrets et références', soon: true },
    ],
  },
  {
    label: 'Base de données',
    href: '/database/vehicles',
    image: '/images/gameplay4.jpg',
    links: [
      { href: '/database/vehicles', label: 'Véhicules', desc: 'Stats et prix complets', soon: true },
      { href: '/database/weapons', label: 'Armes', desc: 'Dégâts, portée, cadence', soon: true },
      { href: '/compare', label: 'Comparateur', desc: 'Côte à côte', soon: true },
    ],
  },
  {
    label: 'Outils',
    href: '/business-calc',
    image: '/images/gameplay5.jpg',
    links: [
      { href: '/business-calc', label: 'Business GTA Online', desc: 'Revenu/heure par activité', soon: true },
      { href: '/sharkcard', label: 'Shark Cards', desc: 'Grind vs argent réel', soon: true },
    ],
  },
  {
    label: 'Médias',
    href: '/media/trailers',
    image: '/images/gameplay6.jpg',
    links: [
      { href: '/media/screenshots', label: 'Screenshots & Artworks', desc: 'Images officielles HD' },
      { href: '/media/trailers', label: 'Trailers', desc: 'Toutes les vidéos' },
    ],
  },
]

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-gold)', flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="flex items-center flex-shrink-0" onClick={onClick}>
      <span
        className="text-xl leading-none"
        style={{ fontFamily: "'Pricedown', var(--font-barlow)", letterSpacing: '0.01em' }}
      >
        <span className="text-white">grand theft </span>
        <span style={{ color: 'var(--accent-gold)' }}>info</span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeAll = () => {
    setActiveMenu(null)
    setMobileOpen(false)
    setOpenSection(null)
  }

  const handleEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveMenu(label)
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150)
  }

  return (
    <>
      <nav className="sticky top-0 z-50" style={{ background: 'rgba(8,30,54,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

          <Logo onClick={closeAll} />

          {/* Desktop nav */}
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
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {activeMenu === item.label && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-1 min-w-[280px]"
                    onMouseEnter={() => handleEnter(item.label)}
                    onMouseLeave={handleLeave}
                  >
                    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#0A1E33', border: '1px solid rgba(240,192,64,0.2)' }}>
                      <div className="p-3">
                        <p className="text-xs font-black tracking-[0.2em] uppercase px-2 pb-2" style={{ color: 'var(--accent-gold)' }}>
                          {item.label}
                        </p>
                        <div className="space-y-0.5">
                          {item.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setActiveMenu(null)}
                              className="flex items-start px-3 py-2.5 rounded-xl transition-all"
                              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(240,192,64,0.08)')}
                              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                            >
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-white leading-tight flex items-center gap-1.5">
                                  {link.label}
                                  {link.soon && <ClockIcon />}
                                </p>
                                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{link.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="relative mx-3 mb-3 rounded-xl overflow-hidden" style={{ height: 80 }}>
                        <Image src={item.image} alt="" fill className="object-cover" aria-hidden="true" />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(8,20,40,0.6) 0%, transparent 60%)' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/acheter"
            className="hidden md:inline-flex px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: '#E8376A', color: '#fff' }}
            onClick={closeAll}
          >
            Précommander
          </Link>

          {/* Burger button — mobile only */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-xl gap-1.5 transition-colors"
            style={{ background: mobileOpen ? 'rgba(255,255,255,0.08)' : 'transparent' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <span
              className="block w-5 h-0.5 bg-white transition-all duration-300 origin-center"
              style={{ transform: mobileOpen ? 'rotate(45deg) translate(2px, 3px)' : 'none' }}
            />
            <span
              className="block w-5 h-0.5 bg-white transition-all duration-300"
              style={{ opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? 'scaleX(0)' : 'none' }}
            />
            <span
              className="block w-5 h-0.5 bg-white transition-all duration-300 origin-center"
              style={{ transform: mobileOpen ? 'rotate(-45deg) translate(2px, -3px)' : 'none' }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-[60] md:hidden flex flex-col transition-all duration-300"
        style={{
          background: 'rgba(6,15,28,0.98)',
          backdropFilter: 'blur(20px)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transform: mobileOpen ? 'translateY(0)' : 'translateY(-8px)',
        }}
      >
        {/* Overlay header */}
        <div className="h-16 flex items-center justify-between px-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Logo onClick={closeAll} />
          <button
            onClick={() => setMobileOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-xl"
            style={{ background: 'rgba(255,255,255,0.06)' }}
            aria-label="Fermer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Overlay content */}
        <div className="flex-1 overflow-y-auto py-4 px-4">
          {menu.map((item) => (
            <div key={item.label} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

              {/* Section header */}
              <button
                className="w-full flex items-center justify-between py-4 text-left"
                onClick={() => setOpenSection(openSection === item.label ? null : item.label)}
              >
                <span className="text-base font-bold text-white">{item.label}</span>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className="transition-transform duration-200 flex-shrink-0"
                  style={{
                    color: 'var(--accent-gold)',
                    transform: openSection === item.label ? 'rotate(180deg)' : 'none',
                  }}
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Sub-links */}
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openSection === item.label ? '400px' : '0' }}
              >
                <div className="pb-3 space-y-1">
                  {item.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeAll}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl transition-colors"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      <div
                        className="w-1 h-full self-stretch rounded-full flex-shrink-0"
                        style={{ background: 'var(--accent-gold)', minHeight: 32, width: 2 }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                          {link.label}
                          {link.soon && <ClockIcon />}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{link.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Overlay footer — CTA */}
        <div className="flex-shrink-0 p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link
            href="/acheter"
            onClick={closeAll}
            className="flex items-center justify-center w-full py-4 rounded-2xl font-medium text-base transition-all hover:opacity-90"
            style={{ background: '#E8376A', color: '#fff' }}
          >
            Précommander GTA VI
          </Link>
          <p className="text-center text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
            Disponible le 19 novembre 2026
          </p>
        </div>
      </div>
    </>
  )
}

'use client'

import Image from 'next/image'
import PageNextSteps from '@/components/ui/PageNextSteps'

// ─── Types ────────────────────────────────────────────────────────────────────

type BadgeType = 'bonus' | 'new' | 'discount' | 'event' | 'last'
type SectionIcon = 'bonus' | 'vehicle' | 'event' | 'content' | 'property'

interface WeeklyItem {
  badge: BadgeType
  title: string
  desc: string
  value?: string   // '2x', '-40%', etc.
  endDate?: string
}

interface WeekSection {
  id: string
  title: string
  subtitle: string
  icon: SectionIcon
  layout: 'list' | 'grid'
  items: WeeklyItem[]
}

interface Spotlight {
  category: string
  title: string
  image: string
}

interface WeekData {
  id: string
  label: string
  dateRange: string
  isCurrent?: boolean
  summary: string
  spotlights: Spotlight[]
  sections: WeekSection[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const weeks: WeekData[] = [
  {
    id: 'w-jun17',
    label: 'Bonus & événements de la semaine',
    dateRange: 'Mis à jour chaque semaine',
    isCurrent: true,
    summary: 'Tu trouveras ici les bonus actifs, les événements en cours, les nouvelles sorties de véhicules et tout le contenu ajouté chaque semaine dans GTA Online.',
    spotlights: [
      { category: 'Événement', title: 'Double Argent — Courses de Rue', image: '/images/gameplay2.jpg' },
      { category: 'Nouveau Véhicule', title: 'Grotti Turismo Omnis', image: '/images/gameplay1.jpg' },
    ],
    sections: [
      {
        id: 'bonus',
        title: 'Les bonus actifs de la semaine',
        subtitle: 'Vous retrouverez ici tous les multiplicateurs d\'argent et d\'XP actifs chaque semaine.',
        icon: 'bonus',
        layout: 'list',
        items: [
          { badge: 'bonus', title: 'Courses de rue', desc: 'Toutes les courses VP de Vice City et ses environs.', value: '2x' },
          { badge: 'bonus', title: 'Missions Aviation', desc: 'Contrats et livraisons impliquant des aéronefs.', value: '1.5x' },
          { badge: 'bonus', title: 'Contrats Solo — Jason', desc: 'Missions scénarisées jouables en solo.', value: '1.25x' },
        ],
      },
      {
        id: 'events',
        title: 'Les événements actifs',
        subtitle: 'Les événements actifs, tournois et défis du moment seront affichés ici chaque semaine.',
        icon: 'event',
        layout: 'list',
        items: [
          { badge: 'event', title: 'Race Week', desc: 'Championnat de courses avec classement en temps réel. Récompenses exclusives pour le top 100.', endDate: '23 juin' },
          { badge: 'event', title: 'Semaine de l\'Aviation', desc: 'Missions bonus liées aux aéronefs, challenges en escadron et réductions sur les avions.', endDate: '23 juin' },
          { badge: 'last', title: 'Tournoi Casino — Dernière Chance', desc: 'Dernière semaine pour participer et remporter le Declasse Vigero ZX.', endDate: '23 juin' },
        ],
      },
      {
        id: 'vehicles',
        title: 'Nouvelles sorties & promos véhicules',
        subtitle: 'Toutes les nouvelles sorties de véhicules et les promos de la semaine seront listées ici.',
        icon: 'vehicle',
        layout: 'grid',
        items: [
          { badge: 'new', title: 'Grotti Turismo Omnis', desc: 'Disponible en concession Legendmotorsport. Supercar italienne aux performances de référence.', value: '1 850 000 $' },
          { badge: 'discount', title: 'Pegassi Zentorno Classic', desc: 'Remise limitée à la semaine. Stock disponible chez Southern SA.', value: '-40%' },
          { badge: 'discount', title: 'Vapid Dominator GTX', desc: 'Muscle car américaine en promotion. Modifiable chez Benny\'s Custom.', value: '-25%' },
        ],
      },
      {
        id: 'content',
        title: 'Les nouvelles sorties de contenu',
        subtitle: 'Les nouvelles tenues, propriétés et ajouts de contenu de chaque semaine seront ici.',
        icon: 'content',
        layout: 'list',
        items: [
          { badge: 'new', title: 'Appartement Oceanview Premium', desc: 'Appartement de luxe avec vue sur l\'océan, garage 10 places. Ocean Drive, Vice City.', value: '4 200 000 $' },
          { badge: 'new', title: '5 tenues exclusives Aviation', desc: 'Collection capsule liée à la Semaine Aviation, disponible via Rockstar Rewards.', value: 'Gratuit' },
        ],
      },
    ],
  },
]

// ─── Badge config ─────────────────────────────────────────────────────────────

const badgeConfig: Record<BadgeType, { label: string; bg: string; color: string }> = {
  bonus:    { label: 'BONUS',      bg: 'var(--accent-gold)',         color: '#081E36' },
  new:      { label: 'NOUVEAU',    bg: 'var(--accent-gold)',         color: '#081E36' },
  discount: { label: 'PROMO',      bg: 'rgba(239,68,68,0.18)',       color: '#EF4444' },
  event:    { label: 'ÉVÉNEMENT',  bg: 'rgba(139,31,165,0.22)',      color: '#c084fc' },
  last:     { label: 'DERNIÈRE CHANCE', bg: 'rgba(239,68,68,0.12)', color: '#f87171' },
}

function Badge({ type }: { type: BadgeType }) {
  const c = badgeConfig[type]
  return (
    <span
      className="inline-flex items-center text-xs font-black tracking-widest px-2.5 py-1 rounded flex-shrink-0 whitespace-nowrap"
      style={{ background: c.bg, color: c.color }}
    >
      {c.label}
    </span>
  )
}

// ─── SVG icons ────────────────────────────────────────────────────────────────

function IcoBonus() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  )
}
function IcoVehicle() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 17H5a2 2 0 0 1-2-2V9l3-5h12l3 5v6a2 2 0 0 1-2 2z"/>
      <circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/>
    </svg>
  )
}
function IcoEvent() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
    </svg>
  )
}
function IcoContent() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  )
}
function IcoCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
    </svg>
  )
}
function IcoHistory() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
      <path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/>
    </svg>
  )
}

function SectionIco({ icon }: { icon: SectionIcon }) {
  switch (icon) {
    case 'bonus':    return <IcoBonus />
    case 'vehicle':  return <IcoVehicle />
    case 'event':    return <IcoEvent />
    case 'content':  return <IcoContent />
    case 'property': return <IcoContent />
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function WeeklyClient() {
  const active = weeks[0]

  return (
    <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">

      {/* Notice — coming soon */}
      <div className="flex items-start gap-4 rounded-2xl p-5 mb-10" style={{ background: 'rgba(240,192,64,0.06)', border: '1px solid rgba(240,192,64,0.2)' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: 2 }}>
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
        <div>
          <p className="font-black text-white mb-1" style={{ fontSize: '0.95rem' }}>
            Disponible dès la sortie de GTA VI — 19 novembre 2026
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Cette page sera mise à jour chaque semaine avec les vrais bonus, événements, véhicules et promotions actifs dans GTA Online. Le format ci-dessous est un aperçu de ce que tu trouveras ici.
          </p>
        </div>
      </div>

      <div>

        {/* Main content */}
        <div>
          {/* Week header */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white">{active.label}</h2>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{active.summary}</p>
          </div>

          {/* Spotlights */}
          {active.spotlights.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {active.spotlights.map((spot, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden" style={{ height: 200 }}>
                  <div style={{ opacity: 0.3, position: 'absolute', inset: 0 }}>
                    <Image src={spot.image} alt="" fill className="object-cover" aria-hidden />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(0deg, rgba(8,20,40,0.94) 0%, rgba(8,20,40,0.28) 60%, transparent 100%)' }}
                    />
                    <div className="absolute bottom-0 left-0 p-5">
                      <p className="text-xs font-black uppercase tracking-widest mb-1.5" style={{ color: 'var(--accent-gold)' }}>
                        {spot.category}
                      </p>
                      <p className="text-xl font-black text-white uppercase leading-tight">{spot.title}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(8,20,40,0.82)', border: '1px solid rgba(240,192,64,0.3)', backdropFilter: 'blur(6px)' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-gold)', flexShrink: 0 }}>
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span className="text-xs font-black tracking-widest uppercase" style={{ color: 'var(--accent-gold)' }}>
                        Disponible à la sortie du jeu
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sections */}
          <div className="space-y-10">
            {active.sections.map((section) => (
              <div key={section.id}>
                {/* Section heading */}
                <div className="mb-5">
                  <div className="flex items-center gap-3" style={{ color: 'var(--accent-gold)' }}>
                    <SectionIco icon={section.icon} />
                    <h3 className="text-2xl font-black text-white uppercase">{section.title}</h3>
                  </div>
                  <p className="text-sm mt-1 ml-[34px]" style={{ color: 'var(--text-muted)' }}>{section.subtitle}</p>
                </div>

                <div className="relative">
                  <div style={{ opacity: 0.3, pointerEvents: 'none', userSelect: 'none' }}>
                    {section.layout === 'list' ? (
                      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                        {section.items.map((item, i) => (
                          <div
                            key={i}
                            className="flex gap-3 items-start px-5 py-4"
                            style={{ borderBottom: i < section.items.length - 1 ? '1px solid var(--border)' : 'none' }}
                          >
                            <Badge type={item.badge} />
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-white text-sm">{item.title}</p>
                              <p className="text-sm mt-0.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                              {item.endDate && (
                                <p className="text-xs mt-1 font-semibold" style={{ color: 'rgba(255,255,255,0.28)' }}>
                                  Jusqu'au {item.endDate}
                                </p>
                              )}
                            </div>
                            {item.value && (
                              <span
                                className="flex-shrink-0 font-black text-sm px-2.5 py-1 rounded-lg"
                                style={{ background: 'rgba(240,192,64,0.1)', color: 'var(--accent-gold)', whiteSpace: 'nowrap' }}
                              >
                                {item.value}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-3 gap-4">
                        {section.items.map((item, i) => (
                          <div
                            key={i}
                            className="rounded-2xl p-5 flex flex-col gap-3"
                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <Badge type={item.badge} />
                              {item.value && (
                                <span className="font-black text-sm flex-shrink-0" style={{ color: item.badge === 'discount' ? '#EF4444' : 'var(--accent-gold)' }}>
                                  {item.value}
                                </span>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-white text-sm mb-1">{item.title}</p>
                              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Overlay label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(8,20,40,0.82)', border: '1px solid rgba(240,192,64,0.3)', backdropFilter: 'blur(6px)' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-gold)', flexShrink: 0 }}>
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span className="text-xs font-black tracking-widest uppercase" style={{ color: 'var(--accent-gold)' }}>
                        Disponible à la sortie du jeu
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <PageNextSteps steps={[
            { href: '/patch-notes', label: 'Mises à jour', title: 'Patch Notes', desc: 'Tous les changements techniques et équilibrages', image: '/images/gameplay5.jpg' },
            { href: '/news', label: 'Actualités', title: 'Dernières News', desc: "Toute l'actualité GTA 6 en temps réel", image: '/images/gameplay1.jpg' },
            { href: '/database/vehicles', label: 'Base de données', title: 'Véhicules', desc: 'Stats et prix de tous les véhicules du jeu', image: '/images/gameplay4.jpg' },
          ]} />
        </div>
      </div>
    </div>
  )
}

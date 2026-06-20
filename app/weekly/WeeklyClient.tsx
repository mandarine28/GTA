'use client'

import { useState } from 'react'
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
    label: 'Semaine du 17 juin',
    dateRange: '17 — 23 juin 2027',
    isCurrent: true,
    summary: 'Double argent sur les courses, la Grotti Turismo Omnis débarque en concession et l\'aviation est à l\'honneur.',
    spotlights: [
      { category: 'Événement', title: 'Double Argent — Courses de Rue', image: '/images/gameplay2.jpg' },
      { category: 'Nouveau Véhicule', title: 'Grotti Turismo Omnis', image: '/images/gameplay1.jpg' },
    ],
    sections: [
      {
        id: 'bonus',
        title: 'Bonus Actifs',
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
        title: 'Événements',
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
        title: 'Véhicules',
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
        title: 'Nouveau Contenu',
        icon: 'content',
        layout: 'list',
        items: [
          { badge: 'new', title: 'Appartement Oceanview Premium', desc: 'Appartement de luxe avec vue sur l\'océan, garage 10 places. Ocean Drive, Vice City.', value: '4 200 000 $' },
          { badge: 'new', title: '5 tenues exclusives Aviation', desc: 'Collection capsule liée à la Semaine Aviation, disponible via Rockstar Rewards.', value: 'Gratuit' },
        ],
      },
    ],
  },
  {
    id: 'w-jun10',
    label: 'Semaine du 10 juin',
    dateRange: '10 — 16 juin 2027',
    summary: 'Semaine des braquages avec double argent, et l\'ouverture du Benny\'s Custom Motors.',
    spotlights: [
      { category: 'Événement', title: 'Semaine des Braquages', image: '/images/gameplay5.jpg' },
      { category: 'Nouveau Lieu', title: 'Benny\'s Custom Motors', image: '/images/gameplay4.jpg' },
    ],
    sections: [
      {
        id: 'bonus',
        title: 'Bonus Actifs',
        icon: 'bonus',
        layout: 'list',
        items: [
          { badge: 'bonus', title: 'Braquages Online', desc: 'Toutes les missions de braquage coopératives.', value: '2x' },
          { badge: 'bonus', title: 'Contrats de fuite', desc: 'Missions d\'extraction post-braquage.', value: '1.5x' },
          { badge: 'bonus', title: 'Missions CEO', desc: 'Contrats et livraisons CEO/VIP.', value: '1.25x' },
        ],
      },
      {
        id: 'events',
        title: 'Événements',
        icon: 'event',
        layout: 'list',
        items: [
          { badge: 'event', title: 'Tournoi Braquage Elite', desc: 'Classement basé sur le total d\'argent volé en session publique. Récompense : Pegassi Torero XO.', endDate: '16 juin' },
          { badge: 'event', title: 'Semaine Casino VIP', desc: 'Accès au salon VIP et gains doublés sur le blackjack et la roulette.', endDate: '16 juin' },
        ],
      },
      {
        id: 'vehicles',
        title: 'Véhicules',
        icon: 'vehicle',
        layout: 'grid',
        items: [
          { badge: 'new', title: 'Pegassi Torero XO', desc: 'Décapotable exclusive chez Benny\'s Custom Motors. Options de personnalisation illimitées.', value: '2 150 000 $' },
          { badge: 'discount', title: 'Karin Sultan RS', desc: 'Rally car modifiable, promo hebdo chez Benny\'s.', value: '-35%' },
          { badge: 'discount', title: 'Ocelot Swinger', desc: 'Coupé sport classique, remise exclusive cette semaine.', value: '-20%' },
        ],
      },
      {
        id: 'content',
        title: 'Nouveau Contenu',
        icon: 'content',
        layout: 'list',
        items: [
          { badge: 'new', title: 'Benny\'s Custom Motors — Vice City', desc: 'Nouveau garage de personnalisation dédié aux low-riders et muscles cars, Port Gellhorn.', value: 'Gratuit' },
          { badge: 'new', title: 'Pack tenues "Heist Crew"', desc: '8 nouvelles tenues thématiques pour la semaine braquage.', value: 'Rockstar Rewards' },
        ],
      },
    ],
  },
  {
    id: 'w-jun03',
    label: 'Semaine du 3 juin',
    dateRange: '3 — 9 juin 2027',
    summary: 'Semaine maritime : courses nautiques, double argent sur le port et nouveau yacht disponible.',
    spotlights: [
      { category: 'Événement', title: 'Championnat Nautique', image: '/images/gameplay6.jpg' },
      { category: 'Nouveau', title: 'Yacht de Luxe — Port de Gellhorn', image: '/images/gameplay3.jpg' },
    ],
    sections: [
      {
        id: 'bonus',
        title: 'Bonus Actifs',
        icon: 'bonus',
        layout: 'list',
        items: [
          { badge: 'bonus', title: 'Courses nautiques', desc: 'Toutes les courses de jet-ski et hors-bord.', value: '2x' },
          { badge: 'bonus', title: 'Missions port', desc: 'Livraisons et contrats liés aux docks de Gellhorn.', value: '1.5x' },
        ],
      },
      {
        id: 'vehicles',
        title: 'Véhicules',
        icon: 'vehicle',
        layout: 'grid',
        items: [
          { badge: 'new', title: 'Shitzu Squalo', desc: 'Hors-bord rapide disponible chez Docktease. Le plus rapide de la catégorie.', value: '980 000 $' },
          { badge: 'discount', title: 'Dinghy Maritime', desc: 'Bateau discret idéal pour les missions de port.', value: '-50%' },
          { badge: 'discount', title: 'Jetmax', desc: 'Yacht compact, parfait pour la traversée côtière.', value: '-30%' },
        ],
      },
      {
        id: 'content',
        title: 'Nouveau Contenu',
        icon: 'content',
        layout: 'list',
        items: [
          { badge: 'new', title: 'Yacht "Vice Wave" achetable', desc: 'Propriété flottante avec hélipad, spa et 4 chambres. Ancré au Port de Gellhorn.', value: '7 500 000 $' },
          { badge: 'new', title: 'Pack tenues "Sailor"', desc: '6 tenues marines et 2 accessoires exclusifs.', value: 'Rockstar Rewards' },
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
  const [active, setActive] = useState(weeks[0])

  return (
    <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
      <div className="grid lg:grid-cols-[272px_1fr] gap-10 items-start">

        {/* Sidebar */}
        <aside className="hidden lg:block sticky top-24">
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
            Historique
          </p>
          <div className="space-y-2 mb-6">
            {weeks.map((w) => {
              const isActive = w.id === active.id
              return (
                <button
                  key={w.id}
                  onClick={() => setActive(w)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all"
                  style={{
                    background: isActive ? 'var(--accent-gold)' : 'var(--bg-card)',
                    border: `1px solid ${isActive ? 'var(--accent-gold)' : 'var(--border)'}`,
                    color: isActive ? '#081E36' : 'var(--text-warm)',
                  }}
                >
                  <div>
                    <p className="font-black text-sm">{w.label}</p>
                    {w.isCurrent && (
                      <p className="text-xs font-semibold mt-0.5" style={{ color: isActive ? 'rgba(8,30,54,0.65)' : 'var(--accent-gold)' }}>
                        En cours
                      </p>
                    )}
                  </div>
                  {isActive ? <IcoCheck /> : <IcoHistory />}
                </button>
              )
            })}
          </div>

          {/* Active week summary card */}
          <div className="rounded-xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)' }}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--accent-gold)' }}>
              Semaine active
            </p>
            <p className="text-sm text-white font-semibold leading-snug">{active.dateRange}</p>
          </div>
        </aside>

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
              ))}
            </div>
          )}

          {/* Sections */}
          <div className="space-y-10">
            {active.sections.map((section) => (
              <div key={section.id}>
                {/* Section heading */}
                <div className="flex items-center gap-3 mb-5" style={{ color: 'var(--accent-gold)' }}>
                  <SectionIco icon={section.icon} />
                  <h3 className="text-2xl font-black text-white uppercase">{section.title}</h3>
                </div>

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

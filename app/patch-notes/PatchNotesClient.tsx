'use client'

import { useState } from 'react'
import Image from 'next/image'
import PageNextSteps from '@/components/ui/PageNextSteps'

type BadgeType = 'new' | 'fix' | 'adjust' | 'balance' | 'skin'
type SectionLayout = 'list' | 'grid'
type SectionIcon = 'vehicle' | 'weapon' | 'world' | 'gameplay' | 'fix' | 'online'

interface PatchItem {
  badge: BadgeType
  title: string
  desc: string
}

interface PatchSection {
  id: string
  title: string
  icon: SectionIcon
  layout: SectionLayout
  items: PatchItem[]
}

interface Spotlight {
  category: string
  title: string
  image: string
}

interface PatchVersion {
  version: string
  label: string
  date: string
  isCurrent?: boolean
  spotlights: Spotlight[]
  sections: PatchSection[]
}

const versions: PatchVersion[] = [
  {
    version: 'v1.05',
    label: 'v1.05 (Actuel)',
    date: '14 juin 2027',
    isCurrent: true,
    spotlights: [
      { category: 'Nouveau Contenu', title: 'Pack Lowriders : Ocean Drive', image: '/images/gameplay1.jpg' },
      { category: 'Environnement', title: 'Météo Dynamique V2.0', image: '/images/gameplay3.jpg' },
    ],
    sections: [
      {
        id: 'vehicules',
        title: 'Véhicules',
        icon: 'vehicle',
        layout: 'list',
        items: [
          { badge: 'new', title: 'Pegassi Torero XO', desc: "Ajout de la variante décapotable avec options de personnalisation exclusives chez Benny's." },
          { badge: 'adjust', title: 'Physique des Motos', desc: "Amélioration de l'adhérence lors des virages à haute vitesse, réduction de la sensibilité des suspensions en terrain accidenté." },
        ],
      },
      {
        id: 'armement',
        title: 'Armement',
        icon: 'weapon',
        layout: 'list',
        items: [
          { badge: 'skin', title: "Série de Skins 'Neon Nights'", desc: "Collection réactive qui brille selon l'heure du jour (disponible pour SMG et Fusil à Pompe)." },
          { badge: 'balance', title: 'Fusil d\'Assaut Mk II', desc: 'Réduction du recul horizontal de 15% et légère augmentation de la cadence de tir.' },
        ],
      },
      {
        id: 'monde',
        title: 'Monde & Environnement',
        icon: 'world',
        layout: 'grid',
        items: [
          { badge: 'adjust', title: "Reflets de l'eau", desc: 'Amélioration du Ray Tracing sur les surfaces aquatiques en bord de mer.' },
          { badge: 'adjust', title: 'Densité de la Foule', desc: 'Augmentation de 20% des PNJs sur Vice Beach pendant les week-ends In-Game.' },
          { badge: 'adjust', title: 'Cycle Jour/Nuit', desc: "Transitions lumineuses plus fluides lors de l'aube et du crépuscule." },
        ],
      },
    ],
  },
  {
    version: 'v1.04',
    label: 'v1.04',
    date: '2 mai 2027',
    spotlights: [
      { category: 'GTA Online', title: 'Mode Braquage Coopératif', image: '/images/gameplay2.jpg' },
      { category: 'Immobilier', title: 'Appartements de Luxe', image: '/images/gameplay4.jpg' },
    ],
    sections: [
      {
        id: 'gameplay',
        title: 'Gameplay',
        icon: 'gameplay',
        layout: 'list',
        items: [
          { badge: 'new', title: 'Braquages en équipe', desc: 'Nouveau mode coopératif 4 joueurs avec phase de planification dans Vice City.' },
          { badge: 'new', title: '5 appartements de luxe', desc: "Disponibles à l'achat sur Ocean Drive, avec garage intégré et vue panoramique." },
          { badge: 'balance', title: "IA des forces de l'ordre", desc: 'Les policiers gèrent mieux les zones urbaines denses et réagissent aux alertes environnantes.' },
        ],
      },
      {
        id: 'correctifs',
        title: 'Correctifs',
        icon: 'fix',
        layout: 'list',
        items: [
          { badge: 'fix', title: 'Crash en session publique', desc: "Résolution du crash aléatoire lors de l'entrée dans un appartement personnel." },
          { badge: 'fix', title: 'PNJ bloqués', desc: 'Correction du blocage dans certaines zones de Port Gellhorn.' },
          { badge: 'fix', title: 'Récompenses de mission', desc: 'Bug résolu sur les écrans de récompense post-mission.' },
        ],
      },
    ],
  },
  {
    version: 'v1.03',
    label: 'v1.03',
    date: '18 mars 2027',
    spotlights: [
      { category: 'Stabilité', title: 'Optimisations Majeures', image: '/images/gameplay5.jpg' },
      { category: 'Online', title: 'Sessions Plus Stables', image: '/images/gameplay6.jpg' },
    ],
    sections: [
      {
        id: 'performances',
        title: 'Performances',
        icon: 'fix',
        layout: 'list',
        items: [
          { badge: 'adjust', title: 'Temps de chargement', desc: 'Réduction de 30% des temps de chargement en session publique et privée.' },
          { badge: 'adjust', title: 'Framerate PS5 Pro', desc: 'Mode 120fps stabilisé, sans drops perceptibles lors des scènes intenses.' },
        ],
      },
      {
        id: 'online',
        title: 'GTA Online',
        icon: 'online',
        layout: 'list',
        items: [
          { badge: 'fix', title: 'Déconnexions en lobby', desc: 'Résolution des déconnexions aléatoires avant démarrage de mission.' },
          { badge: 'fix', title: 'Duplication de véhicules', desc: "Fermeture du glitch via le garage de l'appartement personnel." },
          { badge: 'new', title: 'Filtres de session', desc: 'Nouveau filtre "amis uniquement" et "région" dans le menu de session.' },
        ],
      },
    ],
  },
]

const badgeConfig: Record<BadgeType, { label: string; bg: string; color: string }> = {
  new:     { label: 'NOUVEAU',    bg: 'var(--accent-gold)',         color: '#081E36' },
  fix:     { label: 'CORRECTIF',  bg: 'rgba(239,68,68,0.18)',       color: '#EF4444' },
  adjust:  { label: 'AJUSTEMENT', bg: 'rgba(255,255,255,0.09)',     color: 'rgba(255,255,255,0.5)' },
  balance: { label: 'ÉQUILIBRE',  bg: 'rgba(255,255,255,0.09)',     color: 'rgba(255,255,255,0.5)' },
  skin:    { label: 'SKINS',      bg: 'rgba(255,255,255,0.09)',     color: 'rgba(255,255,255,0.5)' },
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

function IcoVehicle() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 17H5a2 2 0 0 1-2-2V9l3-5h12l3 5v6a2 2 0 0 1-2 2z"/>
      <circle cx="7.5" cy="17" r="1.5"/>
      <circle cx="16.5" cy="17" r="1.5"/>
    </svg>
  )
}

function IcoWeapon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="3"/>
      <line x1="12" y1="3" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="21"/>
      <line x1="3" y1="12" x2="6" y2="12"/>
      <line x1="18" y1="12" x2="21" y2="12"/>
    </svg>
  )
}

function IcoWorld() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
      <line x1="8" y1="2" x2="8" y2="18"/>
      <line x1="16" y1="6" x2="16" y2="22"/>
    </svg>
  )
}

function IcoGameplay() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="6"/>
      <path d="M6 12h4M8 10v4"/>
      <circle cx="16" cy="11" r="1" fill="currentColor" stroke="none"/>
      <circle cx="18" cy="13" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function IcoFix() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>
    </svg>
  )
}

function IcoOnline() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a14.5 14.5 0 0 1 0 20M12 2a14.5 14.5 0 0 0 0 20"/>
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.45 }}>
      <path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/>
    </svg>
  )
}

function SectionIco({ icon }: { icon: SectionIcon }) {
  switch (icon) {
    case 'vehicle':  return <IcoVehicle />
    case 'weapon':   return <IcoWeapon />
    case 'world':    return <IcoWorld />
    case 'gameplay': return <IcoGameplay />
    case 'fix':      return <IcoFix />
    case 'online':   return <IcoOnline />
  }
}

export default function PatchNotesClient() {
  const [active, setActive] = useState(versions[0])

  return (
    <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
      <div className="grid lg:grid-cols-[272px_1fr] gap-10 items-start">

        {/* Sidebar */}
        <aside className="hidden lg:block sticky top-24">
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
            Historique
          </p>
          <div className="space-y-2 mb-6">
            {versions.map((v) => {
              const isActive = v.version === active.version
              return (
                <button
                  key={v.version}
                  onClick={() => setActive(v)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all"
                  style={{
                    background: isActive ? 'var(--accent-gold)' : 'var(--bg-card)',
                    border: `1px solid ${isActive ? 'var(--accent-gold)' : 'var(--border)'}`,
                    color: isActive ? '#081E36' : 'var(--text-warm)',
                  }}
                >
                  <span className="font-black text-sm">{v.label}</span>
                  {isActive ? <IcoCheck /> : <IcoHistory />}
                </button>
              )
            })}
          </div>

        </aside>

        {/* Main */}
        <div>
          {/* Version header */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white">{active.label}</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{active.date}</p>
          </div>

          {/* Spotlights */}
          {active.spotlights.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {active.spotlights.map((spot, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden" style={{ height: 200 }}>
                  <Image src={spot.image} alt="" fill className="object-cover" aria-hidden="true" />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(0deg, rgba(8,20,40,0.92) 0%, rgba(8,20,40,0.3) 60%, transparent 100%)' }}
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
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-4">
                    {section.items.map((item, i) => (
                      <div key={i} className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                        <div className="mb-3" style={{ color: 'var(--accent-gold)' }}>
                          <SectionIco icon={section.icon} />
                        </div>
                        <p className="font-bold text-white text-sm mb-2">{item.title}</p>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <PageNextSteps steps={[
            { href: '/news', label: 'Actualités', title: 'Dernières News', desc: "Toute l'actualité GTA 6 en temps réel", image: '/images/gameplay1.jpg' },
            { href: '/weekly', label: 'Hebdo', title: 'Màj Hebdomadaire', desc: 'Le récap complet des événements de la semaine', image: '/images/gameplay2.jpg' },
            { href: '/database/vehicles', label: 'Base de données', title: 'Véhicules', desc: 'Stats et performances après le dernier patch', image: '/images/gameplay5.jpg' },
          ]} />
        </div>
      </div>
    </div>
  )
}

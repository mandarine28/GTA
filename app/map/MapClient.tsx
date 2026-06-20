'use client'

import { useState } from 'react'
import Image from 'next/image'
import PageNextSteps from '@/components/ui/PageNextSteps'

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = 'all' | 'districts' | 'missions' | 'activities' | 'locations'

interface LeakItem { text: string; source: 'official' | 'leak' }

interface POI {
  id: string
  name: string
  category: Exclude<Category, 'all'>
  districtId: string
  cx: number  // SVG coords
  cy: number
  desc: string
  leaks: LeakItem[]
  tags: string[]
  image: string
  typeBg: string
  typeColor: string
  typeLabel: string
}

// ─── District map shapes ──────────────────────────────────────────────────────

// SVG viewBox 0 0 880 520
const districtShapes = [
  {
    id: 'grassrivers',
    name: 'Grassrivers',
    fill: 'rgba(163,230,53,0.13)',
    stroke: 'rgba(163,230,53,0.55)',
    fillHover: 'rgba(163,230,53,0.28)',
    points: '100,28 490,22 468,196 300,212 102,194',
    labelX: 270, labelY: 118,
  },
  {
    id: 'port',
    name: 'Port Gellhorn',
    fill: 'rgba(239,68,68,0.13)',
    stroke: 'rgba(239,68,68,0.5)',
    fillHover: 'rgba(239,68,68,0.28)',
    points: '56,198 100,194 300,212 306,362 198,422 56,382',
    labelX: 168, labelY: 298,
  },
  {
    id: 'downtown',
    name: 'Vice City Downtown',
    fill: 'rgba(240,192,64,0.13)',
    stroke: 'rgba(240,192,64,0.6)',
    fillHover: 'rgba(240,192,64,0.28)',
    points: '300,212 468,196 522,352 306,362',
    labelX: 398, labelY: 290,
  },
  {
    id: 'neon',
    name: 'Neon Coast',
    fill: 'rgba(139,31,165,0.13)',
    stroke: 'rgba(139,31,165,0.6)',
    fillHover: 'rgba(139,31,165,0.28)',
    points: '468,22 800,28 852,258 836,448 696,462 572,384 522,352 468,196',
    labelX: 680, labelY: 240,
  },
  {
    id: 'everglades',
    name: 'Everglades',
    fill: 'rgba(34,197,94,0.13)',
    stroke: 'rgba(34,197,94,0.55)',
    fillHover: 'rgba(34,197,94,0.28)',
    points: '56,382 198,422 340,436 354,512 56,512',
    labelX: 188, labelY: 466,
  },
  {
    id: 'beach',
    name: 'Pelican Beach',
    fill: 'rgba(56,189,248,0.13)',
    stroke: 'rgba(56,189,248,0.55)',
    fillHover: 'rgba(56,189,248,0.28)',
    points: '306,362 522,352 572,384 696,462 836,448 836,512 354,512 340,436 198,422',
    labelX: 526, labelY: 454,
  },
]

// Roads — thin decorative lines
const roads = [
  'M 300,212 L 522,352',          // main diagonal
  'M 198,422 L 836,448',          // coastal highway (south)
  'M 468,22 L 468,196',           // north-south route
  'M 56,280 L 880,280',           // east-west main
  'M 400,22 L 354,512',           // inner north-south
  'M 100,194 L 56,280',           // port access
  'M 836,280 L 852,258',          // neon coast border road
]

// ─── POI data ────────────────────────────────────────────────────────────────

const pois: POI[] = [
  // DISTRICTS
  {
    id: 'downtown-district',
    name: 'Vice City Downtown',
    category: 'districts',
    districtId: 'downtown',
    cx: 414, cy: 278,
    typeLabel: 'URBAIN', typeBg: '#F0C040', typeColor: '#081E36',
    image: '/images/gameplay1.jpg',
    desc: "Coeur de Vice City. Gratte-ciels, hôtels de luxe et casinos dans la zone la plus dense du jeu.",
    leaks: [
      { text: 'Gratte-ciels intégralement explorables (trailers officiels)', source: 'official' },
      { text: 'Scène de braquage de banque filmée in-game', source: 'official' },
      { text: 'Casino achetable en mode histoire', source: 'leak' },
    ],
    tags: ['Gratte-ciels', 'Casinos', 'Braquages'],
  },
  {
    id: 'neon-district',
    name: 'Neon Coast',
    category: 'districts',
    districtId: 'neon',
    cx: 672, cy: 230,
    typeLabel: 'NOCTURNE', typeBg: '#8B1FA5', typeColor: '#fff',
    image: '/images/gameplay2.jpg',
    desc: "Clubs, néons et vie nocturne intense. Inspiré de South Beach Miami.",
    leaks: [
      { text: 'Clubs actifs avec musique dynamique (Trailer 2)', source: 'official' },
      { text: 'Courses de rue nocturnes confirmées', source: 'official' },
      { text: 'DLC "Neon Pack" développé dès le lancement', source: 'leak' },
    ],
    tags: ['Clubs', 'Néons', 'Courses'],
  },
  {
    id: 'port-district',
    name: 'Port Gellhorn',
    category: 'districts',
    districtId: 'port',
    cx: 174, cy: 296,
    typeLabel: 'INDUSTRIEL', typeBg: '#ef4444', typeColor: '#fff',
    image: '/images/gameplay5.jpg',
    desc: "Port industriel et quartier des docks, hub de contrebande.",
    leaks: [
      { text: 'Zone de docks avec missions de contrebande', source: 'official' },
      { text: 'Sous-marin jouable ancré dans le port', source: 'leak' },
      { text: 'Braquage de cargo inspiré du film "Heat"', source: 'leak' },
    ],
    tags: ['Docks', 'Sous-marins', 'Criminalité'],
  },
  {
    id: 'grassrivers-district',
    name: 'Grassrivers',
    category: 'districts',
    districtId: 'grassrivers',
    cx: 278, cy: 114,
    typeLabel: 'RURAL', typeBg: '#a3e635', typeColor: '#081E36',
    image: '/images/gameplay4.jpg',
    desc: "Banlieues rurales et communautés clôturées entre le centre et les marécages.",
    leaks: [
      { text: 'Communautés clôturées visibles dans les trailers', source: 'official' },
      { text: 'Course-poursuite principale en banlieue (histoire)', source: 'leak' },
      { text: 'Concessionnaire auto de luxe accessible', source: 'leak' },
    ],
    tags: ['Rural', 'Communautés', 'Pick-ups'],
  },
  {
    id: 'everglades-district',
    name: 'Everglades de Leonida',
    category: 'districts',
    districtId: 'everglades',
    cx: 190, cy: 464,
    typeLabel: 'NATUREL', typeBg: '#22c55e', typeColor: '#081E36',
    image: '/images/gameplay3.jpg',
    desc: "Marécages et forêts tropicales, faune hostile et contrebandiers.",
    leaks: [
      { text: 'Alligators confirmés comme faune hostile', source: 'official' },
      { text: 'Planques isolées de trafiquants (trailer)', source: 'official' },
      { text: 'Mission de chasse intégrée au mode histoire', source: 'leak' },
    ],
    tags: ['Marécages', 'Alligators', 'Contrebande'],
  },
  {
    id: 'beach-district',
    name: 'Pelican Beach',
    category: 'districts',
    districtId: 'beach',
    cx: 538, cy: 456,
    typeLabel: 'CÔTIER', typeBg: '#38bdf8', typeColor: '#081E36',
    image: '/images/gameplay6.jpg',
    desc: "Plages touristiques et hôtels balnéaires, activités nautiques.",
    leaks: [
      { text: 'Plages entièrement explorables (Trailer 1)', source: 'official' },
      { text: 'Courses de jet-ski confirmées', source: 'official' },
      { text: 'Hôtel de luxe achetable en GTA Online', source: 'leak' },
    ],
    tags: ['Plages', 'Jet-ski', 'Hôtels'],
  },

  // MISSIONS
  {
    id: 'mission-bank',
    name: 'Braquage de la First National',
    category: 'missions',
    districtId: 'downtown',
    cx: 450, cy: 254,
    typeLabel: 'MISSION', typeBg: '#ef4444', typeColor: '#fff',
    image: '/images/gameplay1.jpg',
    desc: "Premier grand braquage de l'histoire. Jason et Lucia planifient l'attaque sur la banque centrale.",
    leaks: [
      { text: 'Confirmé dans le Trailer 1 (scène coffre-fort)', source: 'official' },
      { text: '4 variantes selon l\'approche choisie (discret/force)', source: 'leak' },
    ],
    tags: ['Braquage', 'Planification', 'Argent'],
  },
  {
    id: 'mission-cargo',
    name: 'Le Cargo de Minuit',
    category: 'missions',
    districtId: 'port',
    cx: 128, cy: 348,
    typeLabel: 'MISSION', typeBg: '#ef4444', typeColor: '#fff',
    image: '/images/gameplay5.jpg',
    desc: "Infiltration d'un cargo au port de Gellhorn. Inspiré de la scène de \"Heat\" selon les leaks.",
    leaks: [
      { text: 'Port de Gellhorn visible dans les trailers', source: 'official' },
      { text: 'Mission jouable en solo ou coopération', source: 'leak' },
      { text: 'Sous-marin utilisé pour l\'extraction', source: 'leak' },
    ],
    tags: ['Infiltration', 'Port', 'Coopération'],
  },

  // ACTIVITIES
  {
    id: 'activity-race',
    name: 'Courses Neon Nights',
    category: 'activities',
    districtId: 'neon',
    cx: 618, cy: 292,
    typeLabel: 'ACTIVITÉ', typeBg: '#38bdf8', typeColor: '#081E36',
    image: '/images/gameplay2.jpg',
    desc: "Séries de courses nocturnes dans les rues illuminées de Neon Coast.",
    leaks: [
      { text: 'Courses de rue visibles dans le Trailer 2', source: 'official' },
      { text: 'Système de paris intégré entre joueurs', source: 'leak' },
    ],
    tags: ['Course', 'Nuit', 'Paris'],
  },
  {
    id: 'activity-jetski',
    name: 'Jet Ski Côtier',
    category: 'activities',
    districtId: 'beach',
    cx: 734, cy: 474,
    typeLabel: 'ACTIVITÉ', typeBg: '#38bdf8', typeColor: '#081E36',
    image: '/images/gameplay6.jpg',
    desc: "Courses de jet-ski le long de Pelican Beach, depuis les dunes jusqu'au port.",
    leaks: [
      { text: 'Jet-ski confirmé dans le Trailer 1', source: 'official' },
      { text: 'Mode compétition online jusqu\'à 8 joueurs', source: 'leak' },
    ],
    tags: ['Jet-ski', 'Nautique', 'Côtier'],
  },

  // LOCATIONS
  {
    id: 'loc-casino',
    name: 'Diamond Palace Casino',
    category: 'locations',
    districtId: 'downtown',
    cx: 378, cy: 240,
    typeLabel: 'LIEU', typeBg: '#F0C040', typeColor: '#081E36',
    image: '/images/gameplay1.jpg',
    desc: "Le plus grand casino de Vice City, potentiellement achetable en mode histoire.",
    leaks: [
      { text: 'Casino visible en arrière-plan dans le Trailer 1', source: 'official' },
      { text: 'Achetable pour 5M$ en mode histoire', source: 'leak' },
      { text: 'Mini-jeux intégrés (poker, roulette, machine)', source: 'leak' },
    ],
    tags: ['Casino', 'Achat', 'Mini-jeux'],
  },
  {
    id: 'loc-vortex',
    name: 'The Vortex Nightclub',
    category: 'locations',
    districtId: 'neon',
    cx: 644, cy: 198,
    typeLabel: 'LIEU', typeBg: '#8B1FA5', typeColor: '#fff',
    image: '/images/gameplay2.jpg',
    desc: "Le club le plus populaire de Neon Coast, achetable en GTA Online.",
    leaks: [
      { text: 'Club visible dans le Trailer 2 (scène danse)', source: 'official' },
      { text: 'Achetable pour 2,7M$ en Online', source: 'leak' },
    ],
    tags: ['Nightclub', 'Musique', 'Online'],
  },
]

// ─── Category config ──────────────────────────────────────────────────────────

const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'Tous' },
  { id: 'districts', label: 'Districts' },
  { id: 'missions', label: 'Missions' },
  { id: 'activities', label: 'Activités' },
  { id: 'locations', label: 'Lieux' },
]

const pinRadius: Record<Exclude<Category, 'all'>, number> = {
  districts: 14,
  missions: 10,
  activities: 10,
  locations: 10,
}

const pinColors: Record<Exclude<Category, 'all'>, string> = {
  districts: '#F0C040',
  missions: '#ef4444',
  activities: '#38bdf8',
  locations: '#F0C040',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function IcoOfficial() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F0C040" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
    </svg>
  )
}

function IcoLeak() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="0.5" fill="rgba(255,255,255,0.3)"/>
    </svg>
  )
}

function InfoPanel({ poi, onClose }: { poi: POI; onClose: () => void }) {
  return (
    <div className="flex flex-col h-full" style={{ background: '#060F1C' }}>
      {/* Image */}
      <div className="relative flex-shrink-0" style={{ height: 160 }}>
        <Image src={poi.image} alt={poi.name} fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(6,15,28,0.95) 0%, transparent 55%)' }} />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.8)' }}
          aria-label="Fermer"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div className="absolute bottom-3 left-4">
          <span
            className="text-xs font-black tracking-widest uppercase px-2.5 py-1 rounded"
            style={{ background: poi.typeBg, color: poi.typeColor }}
          >
            {poi.typeLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        <p className="font-black text-white text-base leading-tight mb-2">{poi.name}</p>
        <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>{poi.desc}</p>

        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--accent-gold)' }}>
          Infos & Leaks
        </p>
        <div className="space-y-2.5 mb-4">
          {poi.leaks.map((item, i) => (
            <div key={i} className="flex gap-2 items-start">
              {item.source === 'official' ? <IcoOfficial /> : <IcoLeak />}
              <p
                className="text-xs leading-snug"
                style={{ color: item.source === 'official' ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.38)' }}
              >
                {item.source === 'leak' && (
                  <span className="font-black uppercase tracking-wider mr-1.5" style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.58rem' }}>
                    LEAK
                  </span>
                )}
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-1.5 flex-wrap pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {poi.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 py-3 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.22)' }}>Basé sur les trailers et leaks officiels</p>
      </div>
    </div>
  )
}

function EmptyPanel() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-center" style={{ background: '#060F1C' }}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(240,192,64,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
        <line x1="8" y1="2" x2="8" y2="18"/>
        <line x1="16" y1="6" x2="16" y2="22"/>
      </svg>
      <div>
        <p className="font-bold text-white text-sm mb-1">Sélectionnez un point</p>
        <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Cliquez sur un district, une mission ou un lieu pour voir les infos et leaks confirmés.
        </p>
      </div>
      <div className="space-y-2 w-full mt-2">
        {[
          { dot: '#F0C040', label: 'Districts' },
          { dot: '#ef4444', label: 'Missions' },
          { dot: '#38bdf8', label: 'Activités & Lieux' },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: l.dot }} />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MapClient() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null)
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null)

  const visiblePois = pois.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  )

  const handlePinClick = (poi: POI) => {
    setSelectedPoi((prev) => (prev?.id === poi.id ? null : poi))
  }

  const getPinColor = (poi: POI): string => {
    if (poi.category === 'districts') return poi.typeBg
    return pinColors[poi.category]
  }

  return (
    <>
      <style>{`
        .district-shape { transition: fill 0.18s ease; cursor: pointer; }
        .map-pin { cursor: pointer; transition: r 0.15s ease; }
        .map-pin:hover circle { r: 15; }
        @keyframes pinRing {
          0%   { r: 14; opacity: 0.7; }
          100% { r: 22; opacity: 0; }
        }
        .pin-active-ring { animation: pinRing 1.4s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) { .pin-active-ring { animation: none; } }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
              style={{
                background: activeCategory === cat.id ? 'var(--accent-gold)' : 'var(--bg-card)',
                color: activeCategory === cat.id ? '#081E36' : 'var(--text-muted)',
                border: `1px solid ${activeCategory === cat.id ? 'var(--accent-gold)' : 'var(--border)'}`,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Map + Info panel */}
        <div
          className="rounded-2xl overflow-hidden mb-10 flex"
          style={{ height: 520, border: '1px solid rgba(240,192,64,0.2)' }}
        >

          {/* ── SVG MAP ── */}
          <div
            className="relative flex-1 min-w-0"
            style={{ background: '#050C16' }}
          >
            {/* Subtle texture */}
            <Image
              src="/images/gameplay3.jpg"
              alt=""
              fill
              className="object-cover pointer-events-none"
              style={{ opacity: 0.04, mixBlendMode: 'luminosity' }}
              aria-hidden
            />

            <svg
              viewBox="0 0 880 520"
              className="w-full h-full"
              style={{ position: 'relative', zIndex: 1 }}
            >
              {/* Water grid */}
              <defs>
                <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
                  <path d="M 44 0 L 0 0 0 44" fill="none" stroke="rgba(240,192,64,0.04)" strokeWidth="0.5"/>
                </pattern>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <rect width="880" height="520" fill="url(#grid)"/>

              {/* Landmass shadow/glow */}
              <polygon
                points="56,194 490,22 852,258 836,512 56,512"
                fill="#050D18"
                stroke="none"
                opacity="0.5"
                style={{ transform: 'translate(4px,4px)' }}
              />

              {/* District polygons */}
              {districtShapes.map((d) => (
                <g key={d.id}>
                  <polygon
                    className="district-shape"
                    points={d.points}
                    fill={hoveredDistrict === d.id ? d.fillHover : d.fill}
                    stroke={d.stroke}
                    strokeWidth="1.5"
                    onMouseEnter={() => setHoveredDistrict(d.id)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                    onClick={() => {
                      const poi = pois.find((p) => p.id === `${d.id}-district`)
                      if (poi) handlePinClick(poi)
                    }}
                  />
                  {/* District name label on map */}
                  <text
                    x={d.labelX}
                    y={d.labelY}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    letterSpacing="1.5"
                    fill="rgba(255,255,255,0.28)"
                    style={{ textTransform: 'uppercase', userSelect: 'none', pointerEvents: 'none' }}
                  >
                    {d.name.toUpperCase()}
                  </text>
                </g>
              ))}

              {/* Roads */}
              {roads.map((r, i) => (
                <path
                  key={i}
                  d={r}
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                  strokeDasharray="none"
                />
              ))}

              {/* POI Pins */}
              {visiblePois.map((poi) => {
                const isActive = selectedPoi?.id === poi.id
                const r = poi.category === 'districts' ? 13 : 8
                const color = getPinColor(poi)
                return (
                  <g
                    key={poi.id}
                    className="map-pin"
                    onClick={() => handlePinClick(poi)}
                    role="button"
                    aria-label={poi.name}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePinClick(poi) }}
                    filter={isActive ? 'url(#glow)' : undefined}
                  >
                    {/* Active pulse ring */}
                    {isActive && (
                      <circle
                        cx={poi.cx}
                        cy={poi.cy}
                        r={r}
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        opacity="0.6"
                        className="pin-active-ring"
                      />
                    )}
                    {/* Pin background */}
                    <circle
                      cx={poi.cx}
                      cy={poi.cy}
                      r={isActive ? r + 2 : r}
                      fill={isActive ? color : `${color}28`}
                      stroke={color}
                      strokeWidth={isActive ? 2 : 1.5}
                      style={{ transition: 'all 0.18s ease' }}
                    />
                    {/* Pin dot */}
                    {!isActive && (
                      <circle
                        cx={poi.cx}
                        cy={poi.cy}
                        r={poi.category === 'districts' ? 4 : 3}
                        fill={color}
                      />
                    )}
                  </g>
                )
              })}

              {/* Compass rose */}
              <g transform="translate(836, 66)" opacity="0.35">
                <circle cx="0" cy="0" r="18" fill="none" stroke="rgba(240,192,64,0.3)" strokeWidth="1"/>
                <text x="0" y="-22" textAnchor="middle" fontSize="9" fontWeight="700" fill="rgba(240,192,64,0.7)">N</text>
                <line x1="0" y1="-16" x2="0" y2="16" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
                <line x1="-16" y1="0" x2="16" y2="0" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
                <polygon points="0,-14 -3,0 0,4 3,0" fill="rgba(240,192,64,0.6)"/>
              </g>

              {/* Bottom label */}
              <text x="440" y="510" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.18)" letterSpacing="2">
                COMTÉ DE LEONIDA — VICE CITY ET ENVIRONS
              </text>
            </svg>
          </div>

          {/* ── INFO PANEL ── */}
          <div
            className="hidden lg:flex flex-col flex-shrink-0"
            style={{ width: 280, borderLeft: '1px solid rgba(255,255,255,0.07)' }}
          >
            {selectedPoi ? (
              <InfoPanel poi={selectedPoi} onClose={() => setSelectedPoi(null)} />
            ) : (
              <EmptyPanel />
            )}
          </div>
        </div>

        {/* Mobile info card */}
        {selectedPoi && (
          <div className="lg:hidden rounded-2xl overflow-hidden mb-8" style={{ background: '#060F1C', border: '1px solid var(--border)' }}>
            <div className="relative" style={{ height: 140 }}>
              <Image src={selectedPoi.image} alt={selectedPoi.name} fill className="object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(6,15,28,0.95) 0%, transparent 55%)' }} />
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded" style={{ background: selectedPoi.typeBg, color: selectedPoi.typeColor }}>{selectedPoi.typeLabel}</span>
                <p className="font-black text-white text-sm">{selectedPoi.name}</p>
              </div>
              <button onClick={() => setSelectedPoi(null)} className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }} aria-label="Fermer">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-4 space-y-2">
              {selectedPoi.leaks.map((item, i) => (
                <div key={i} className="flex gap-2 items-start">
                  {item.source === 'official' ? <IcoOfficial /> : <IcoLeak />}
                  <p className="text-xs leading-snug" style={{ color: item.source === 'official' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.38)' }}>
                    {item.source === 'leak' && <span className="font-black uppercase tracking-wider mr-1.5" style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.58rem' }}>LEAK</span>}
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: '2x', label: 'Plus grande que GTA V' },
            { value: '400+', label: "Points d'intérêt" },
            { value: '6', label: 'Districts' },
            { value: '100%', label: 'Explorable dès le début' },
          ].map((fact) => (
            <div key={fact.label} className="rounded-2xl p-5 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <p className="text-3xl font-black mb-1" style={{ color: 'var(--accent-gold)' }}>{fact.value}</p>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{fact.label}</p>
            </div>
          ))}
        </div>

        <PageNextSteps steps={[
          { href: '/game', label: 'Jeu', title: 'Histoire & Personnages', desc: 'Jason et Lucia dans le comté de Leonida', image: '/images/gameplay2.jpg' },
          { href: '/easter-eggs', label: 'Secrets', title: 'Easter Eggs', desc: 'Les secrets cachés par Rockstar dans Vice City', image: '/images/gameplay4.jpg' },
          { href: '/missions', label: 'Guides', title: 'Missions', desc: 'Toutes les missions du mode histoire', image: '/images/gameplay1.jpg' },
        ]} />
      </div>
    </>
  )
}

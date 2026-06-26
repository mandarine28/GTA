'use client'

import { useState } from 'react'
import Image from 'next/image'

type Region = {
  id: string
  name: string
  county: string
  tagline: string
  desc: string
  landmarks: string[]
  inspiration: string
  postcard: string
  screenshots: string[]
}

const regions: Region[] = [
  {
    id: 'vice-city',
    name: 'Vice City',
    county: 'Vice-Dale County',
    tagline: 'Le glamour, la greed, l\'Amérique condensée en une ville.',
    desc: 'Vice City est le cœur urbain de Leonida — la plus grande et la plus dense métropole jamais créée dans GTA. Baignée de néons, portée par l\'énergie du crime et de l\'ambition, elle concentre gratte-ciels, plages, clubs et inégalités dans un seul et même décor solaire.',
    landmarks: ['Downtown Vice City', 'Little Cuba', 'Tequesta', 'La Perle', 'Southside', 'Rockridge', 'Vice City International Airport', 'PortViceCity', 'Sahara Arena'],
    inspiration: 'Miami (Floride)',
    postcard: '/images/regions/vice-city/montage.jpg',
    screenshots: [
      '/images/regions/vice-city/ss1.jpg',
      '/images/regions/vice-city/ss2.jpg',
      '/images/regions/vice-city/ss3.jpg',
      '/images/regions/vice-city/ss4.jpg',
    ],
  },
  {
    id: 'leonida-keys',
    name: 'Leonida Keys',
    county: 'Mariana County',
    tagline: 'Le dress code, c\'est décontracté. Les bars, bien chargés.',
    desc: 'Archipel tropical au sud de Leonida, les Keys offrent un mode de vie côtier sans prétention. Ponts suspendus, eaux turquoise, bars de bord de mer — la vie y est facile, et personne ne pose trop de questions.',
    landmarks: ['East Key', 'Key Lento', 'Keys Causeway', 'Pont Bahia Honda'],
    inspiration: 'Florida Keys (Floride)',
    postcard: '/images/regions/leonida-keys/postcard.png',
    screenshots: [
      '/images/regions/leonida-keys/ss1.jpg',
      '/images/regions/leonida-keys/ss2.jpg',
      '/images/regions/leonida-keys/ss3.jpg',
      '/images/regions/leonida-keys/ss4.jpg',
    ],
  },
  {
    id: 'grassrivers',
    name: 'Grassrivers',
    county: 'Vice-Dale & Mariana County',
    tagline: 'On ne sait jamais ce qui se cache sous la surface.',
    desc: 'Vaste étendue de zones humides primordiales, Grassrivers est le joyau sauvage de Leonida. Prairies inondées, mangroves denses, alligators et prédateurs inconnus peuplent cet écosystème unique inspiré des Everglades. Watson Bay est la seule ville documentée de la région.',
    landmarks: ['Watson Bay', 'Marécages de mangroves', 'Prairies inondées', 'Réseau de chenaux'],
    inspiration: 'Everglades (Floride)',
    postcard: '/images/regions/grassrivers/postcard.png',
    screenshots: [
      '/images/regions/grassrivers/ss1.jpg',
      '/images/regions/grassrivers/ss2.jpg',
      '/images/regions/grassrivers/ss3.jpg',
      '/images/regions/grassrivers/artwork.jpg',
    ],
  },
  {
    id: 'port-gellhorn',
    name: 'Port Gellhorn',
    county: 'Kelly County',
    tagline: 'La côte oubliée de Leonida.',
    desc: 'Motels bon marché, attractions fermées, centres commerciaux vides — Port Gellhorn incarne une économie locale en déclin reconvertie dans les substances et les boissons énergisantes. La ville portuaire conserve une infrastructure industrielle côtière et quelques établissements qui font tourner l\'économie souterraine.',
    landmarks: ['Gellhorn International Raceway', 'Delights (club)', 'Starlet Motel', 'Port Gellhorn Pawn & Gun', 'Bocamar Bridge', 'Crossroad Park Minimall'],
    inspiration: 'Tampa / Côte ouest de Floride',
    postcard: '/images/regions/port-gellhorn/postcard.png',
    screenshots: [
      '/images/regions/port-gellhorn/ss1.jpg',
      '/images/regions/port-gellhorn/ss2.jpg',
      '/images/regions/port-gellhorn/ss3.jpg',
    ],
  },
  {
    id: 'ambrosia',
    name: 'Ambrosia',
    county: 'Ambrosia County',
    tagline: 'Keeping Leonida sweet.',
    desc: 'Ville industrielle sur les rives du lac Leonida, Ambrosia est dominée par la raffinerie Allied Crystal Sugar. L\'industrie sucrière et les vieilles valeurs américaines y règnent en maîtres — au prix que vous imaginez. Un scrutin municipal en cours et le gang Final Chapter MC animent la vie locale.',
    landmarks: ['Allied Crystal Sugar Refinery', 'Lac Leonida', 'Xero Gas Station', 'Waste Transfer Services', 'Ambrosia County Sheriff\'s Office'],
    inspiration: 'Clewiston / Moore Haven (Floride)',
    postcard: '/images/regions/ambrosia/postcard.png',
    screenshots: [
      '/images/regions/ambrosia/ss1.jpg',
      '/images/regions/ambrosia/ss2.jpg',
      '/images/regions/ambrosia/ss3.jpg',
    ],
  },
  {
    id: 'mont-kalaga',
    name: 'Mont Kalaga',
    county: 'Nord de Leonida',
    tagline: 'Forêts, canyons, rivières — et ceux qui s\'y cachent.',
    desc: 'Le Parc National du Mont Kalaga concentre forêts escarpées, canyons dramatiques et rivières sinueuses dans le nord de Leonida. Chasse, pêche, kayak et courses tout-terrain y côtoient une population de hillbillies paranoïaques et de radicaux isolationnistes. La faune sauvage inclut cerfs, cougars et renards.',
    landmarks: ['Domed Hills', 'Mine de phosphate abandonnée', 'Réseau de rivières', 'Pont ferroviaire', 'Canyon principal'],
    inspiration: 'Forêts du nord de la Floride / Suwannee River',
    postcard: '/images/regions/mont-kalaga/postcard.png',
    screenshots: [
      '/images/regions/mont-kalaga/ss1.jpg',
      '/images/regions/mont-kalaga/ss2.jpg',
      '/images/regions/mont-kalaga/ss3.jpg',
      '/images/regions/mont-kalaga/artwork.jpg',
    ],
  },
]

export default function MapClient() {
  const [active, setActive] = useState(regions[0].id)
  const [activeImg, setActiveImg] = useState(0)

  const region = regions.find(r => r.id === active)!
  const allImgs = [region.postcard, ...region.screenshots]

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 mb-8" style={{ scrollbarWidth: 'none' }}>
        {regions.map((r) => (
          <button
            key={r.id}
            onClick={() => { setActive(r.id); setActiveImg(0) }}
            className="flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap"
            style={
              active === r.id
                ? { background: 'var(--accent-gold)', color: '#081E36' }
                : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.08)' }
            }
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">

        {/* Left — images */}
        <div>
          <div className="relative rounded-2xl overflow-hidden mb-3" style={{ aspectRatio: '16/9' }}>
            <Image
              src={allImgs[activeImg] ?? region.postcard}
              alt={`${region.name}`}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {allImgs.slice(0, 4).map((src, i) => (
              <button
                key={src}
                onClick={() => setActiveImg(i)}
                className="relative rounded-xl overflow-hidden transition-all"
                style={{ aspectRatio: '16/9', outline: activeImg === i ? '2px solid var(--accent-gold)' : '2px solid transparent' }}
              >
                <Image src={src} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right — info */}
        <div>
          <span className="inline-block text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full mb-3" style={{ background: 'rgba(240,192,64,0.12)', color: 'var(--accent-gold)', border: '1px solid rgba(240,192,64,0.25)' }}>
            {region.county}
          </span>
          <h2 className="text-3xl font-black text-white mb-2">{region.name}</h2>
          <p className="text-base italic mb-5" style={{ color: 'var(--accent-gold)' }}>
            &ldquo;{region.tagline}&rdquo;
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-warm)' }}>
            {region.desc}
          </p>

          <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
            Points d&apos;intérêt
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {region.landmarks.map(l => (
              <span key={l} className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-warm)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {l}
              </span>
            ))}
          </div>

          <div className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Inspiration réelle</p>
              <p className="text-sm font-semibold text-white">{region.inspiration}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

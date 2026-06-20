'use client'

import { useState } from 'react'
import PageHero from '@/components/ui/PageHero'
import ComingSoonNotice from '@/components/ui/ComingSoonNotice'
import PageNextSteps from '@/components/ui/PageNextSteps'

const activities = [
  {
    name: 'Cayo Perico Heist',
    category: 'Heist',
    revenuePerHour: 1400000,
    duration: 65,
    payoutMin: 1200000,
    payoutMax: 1500000,
    players: '1',
    difficulty: 'Moyen',
    notes: 'Meilleur ratio solo. Setup ~25min, heist ~40min.',
  },
  {
    name: 'Auto Shop Contracts',
    category: 'Business',
    revenuePerHour: 280000,
    duration: 30,
    payoutMin: 150000,
    payoutMax: 200000,
    players: '1-4',
    difficulty: 'Facile',
    notes: 'Très bien pour débutants. Bonus CEO si applicable.',
  },
  {
    name: 'Acid Lab',
    category: 'Business',
    revenuePerHour: 340000,
    duration: 120,
    payoutMin: 385000,
    payoutMax: 420000,
    players: '1',
    difficulty: 'Facile',
    notes: 'Passif. Resupply toutes les 2h, vendre dès que plein.',
  },
  {
    name: 'MC Businesses',
    category: 'Business',
    revenuePerHour: 170000,
    duration: 120,
    payoutMin: 340000,
    payoutMax: 400000,
    players: '1',
    difficulty: 'Facile',
    notes: 'Passif, combine avec Acid Lab pour maximiser.',
  },
  {
    name: 'Nightclub',
    category: 'Passif',
    revenuePerHour: 50000,
    duration: 480,
    payoutMin: 400000,
    payoutMax: 450000,
    players: '1',
    difficulty: 'Très facile',
    notes: 'Entièrement passif si stocks linkés. Pas d\'effort.',
  },
  {
    name: 'Diamond Casino Heist',
    category: 'Heist',
    revenuePerHour: 980000,
    duration: 90,
    payoutMin: 1500000,
    payoutMax: 2100000,
    players: '2-4',
    difficulty: 'Moyen',
    notes: 'Approche Undetected + Diamonds = jusqu\'à 2.5M.',
  },
  {
    name: 'VIP Work / CEO',
    category: 'VIP',
    revenuePerHour: 220000,
    duration: 30,
    payoutMin: 25000,
    payoutMax: 50000,
    players: '1',
    difficulty: 'Facile',
    notes: 'Sloths x20 ou Headhunter en boucle.',
  },
  {
    name: 'Bunker',
    category: 'Business',
    revenuePerHour: 150000,
    duration: 210,
    payoutMin: 525000,
    payoutMax: 525000,
    players: '1',
    difficulty: 'Facile',
    notes: 'Passif avec Phantom Wedge. Vendre à Blaine County.',
  },
]

const categories = ['Tout', 'Heist', 'Business', 'Passif', 'VIP']

function fmt(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  return `$${(n / 1000).toFixed(0)}K`
}

const LIVE = false // Passer à true au lancement de GTA 6

export default function BusinessCalcPage() {
  if (!LIVE) return (
    <>
      <PageHero title="BUSINESS GTA ONLINE" label="Outils" image="/images/gameplay6.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
        <ComingSoonNotice />
      </div>
    </>
  )

  const [category, setCategory] = useState('Tout')
  const [hours, setHours] = useState(2)
  const [sort, setSort] = useState<'revenue' | 'name'>('revenue')

  const filtered = activities
    .filter(a => category === 'Tout' || a.category === category)
    .sort((a, b) => sort === 'revenue' ? b.revenuePerHour - a.revenuePerHour : a.name.localeCompare(b.name))

  return (
    <>
      <PageHero title="BUSINESS GTA ONLINE" label="Outils" image="/images/gameplay6.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
      <ComingSoonNotice message="Les revenus par activité seront calculés avec des données réelles dès la sortie du jeu. Les estimations actuelles sont extrapolées depuis GTA V Online." />
      {/* Session calculator */}
      <div className="rounded-2xl p-6 mb-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)' }}>
        <p className="text-sm font-bold tracking-wider uppercase mb-4" style={{ color: 'var(--accent-gold)' }}>Simulateur de session</p>
        <div className="flex items-center gap-4">
          <div>
            <label className="text-xs font-semibold mb-2 block" style={{ color: 'var(--text-muted)' }}>Heures de jeu</label>
            <div className="flex items-center gap-3">
              <button onClick={() => setHours(Math.max(1, hours - 1))} className="w-8 h-8 rounded-lg font-bold text-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>-</button>
              <span className="text-2xl font-black w-8 text-center" style={{ color: 'var(--accent-gold)' }}>{hours}h</span>
              <button onClick={() => setHours(Math.min(12, hours + 1))} className="w-8 h-8 rounded-lg font-bold text-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>+</button>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-4 ml-8">
            {[filtered[0], filtered[1], filtered[2]].filter(Boolean).map(a => (
              <div key={a.name} className="text-center">
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>{a.name}</p>
                <p className="text-xl font-black" style={{ color: 'var(--accent-gold)' }}>{fmt(a.revenuePerHour * hours)}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>en {hours}h</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={category === cat
                ? { background: 'rgba(240,192,64,0.2)', color: 'var(--accent-gold)', border: '1px solid rgba(240,192,64,0.4)' }
                : { background: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border)' }
              }
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={() => setSort(sort === 'revenue' ? 'name' : 'revenue')}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg"
          style={{ background: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
        >
          Trier : {sort === 'revenue' ? '$ Revenu' : 'A-Z'}
        </button>
      </div>

      {/* Activities */}
      <div className="space-y-3">
        {filtered.map((activity, i) => (
          <div key={activity.name} className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <p className="font-bold text-white text-lg">{activity.name}</p>
                  {i === 0 && <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: 'var(--accent-gold)', color: '#081E36' }}>MEILLEUR</span>}
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'var(--bg-card-light)', color: 'var(--text-muted)' }}>
                    {activity.category}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{activity.players} joueur(s)</span>
                </div>
                <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>{activity.notes}</p>
                <div className="flex gap-4 flex-wrap">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>Paiement</p>
                    <p className="text-sm font-bold text-white">{fmt(activity.payoutMin)} - {fmt(activity.payoutMax)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>Durée</p>
                    <p className="text-sm font-bold text-white">{activity.duration} min</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>Difficulté</p>
                    <p className="text-sm font-bold text-white">{activity.difficulty}</p>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-3xl font-black" style={{ color: 'var(--accent-gold)' }}>{fmt(activity.revenuePerHour)}</p>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>par heure</p>
                <p className="text-sm font-bold text-white mt-1">{fmt(activity.revenuePerHour * hours)} / {hours}h</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

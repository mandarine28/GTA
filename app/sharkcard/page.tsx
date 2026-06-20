'use client'

import { useState } from 'react'
import PageHero from '@/components/ui/PageHero'
import ComingSoonNotice from '@/components/ui/ComingSoonNotice'
import PageNextSteps from '@/components/ui/PageNextSteps'

const sharkcards = [
  { name: 'Red Shark', amount: 100000, price: 2.99, color: '#EF4444' },
  { name: 'Tiger Shark', amount: 200000, price: 4.99, color: '#F97316' },
  { name: 'Bull Shark', amount: 500000, price: 9.99, color: '#F59E0B' },
  { name: 'Great White Shark', amount: 1250000, price: 19.99, color: '#10B981' },
  { name: 'Whale Shark', amount: 3500000, price: 49.99, color: '#3B82F6' },
  { name: 'Megalodon Shark', amount: 8000000, price: 99.99, color: '#8B5CF6' },
]

const grindable = [
  { name: 'Cayo Perico Heist', perHour: 1400000, desc: '~65 min par run' },
  { name: 'Diamond Casino Heist', perHour: 980000, desc: '~90 min / 4 joueurs' },
  { name: 'Acid Lab', perHour: 340000, desc: 'Passif, 2h cycle' },
  { name: 'Auto Shop', perHour: 280000, desc: '~30 min par contrat' },
]

function fmt(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  return `${(n / 1000).toFixed(0)}K`
}

const LIVE = false // Passer à true au lancement de GTA 6

export default function SharkcardPage() {
  if (!LIVE) return (
    <>
      <PageHero title="SHARK CARDS" label="Outils" image="/images/gameplay4.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
        <ComingSoonNotice />
      </div>
    </>
  )

  const [activity, setActivity] = useState(grindable[0])
  const [hourlyWage, setHourlyWage] = useState(15)

  return (
    <>
      <PageHero title="SHARK CARDS" label="Outils" image="/images/gameplay4.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
      <ComingSoonNotice message="Les prix des Shark Cards GTA Online n'ont pas encore été annoncés officiellement. Cette section sera mise à jour dès la confirmation des tarifs." />
      {/* Calculator */}
      <div className="rounded-2xl p-6 mb-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)' }}>
        <p className="text-sm font-bold tracking-wider uppercase mb-4" style={{ color: 'var(--accent-gold)' }}>Comparateur personnalisé</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-semibold mb-2 block" style={{ color: 'var(--text-muted)' }}>Ton salaire horaire (€/h)</label>
            <input
              type="number"
              value={hourlyWage}
              onChange={e => setHourlyWage(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl font-bold text-white focus:outline-none"
              style={{ background: 'var(--bg-card-light)', border: '1px solid var(--border)' }}
            />
          </div>
          <div>
            <label className="text-xs font-semibold mb-2 block" style={{ color: 'var(--text-muted)' }}>Méthode de grind préférée</label>
            <select
              value={activity.name}
              onChange={e => setActivity(grindable.find(g => g.name === e.target.value)!)}
              className="w-full px-4 py-3 rounded-xl font-semibold text-white focus:outline-none"
              style={{ background: 'var(--bg-card-light)', border: '1px solid var(--border)' }}
            >
              {grindable.map(g => <option key={g.name} value={g.name}>{g.name},${fmt(g.perHour)}/h</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Cards comparison */}
      <div className="space-y-4">
        {sharkcards.map((card) => {
          const grindHours = card.amount / activity.perHour
          const grindEuros = grindHours * hourlyWage
          const cheaper = grindEuros < card.price ? 'grind' : 'card'

          return (
            <div key={card.name} className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-4">
                <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: card.color }} />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-black text-white text-lg mb-1">{card.name}</p>
                      <p className="text-2xl font-black" style={{ color: card.color }}>${fmt(card.amount)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-muted)' }}>Prix réel</p>
                      <p className="text-xl font-black text-white">{card.price}€</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Temps de grind</p>
                      <p className="font-bold text-white">{grindHours < 1 ? `${Math.round(grindHours * 60)}min` : `${grindHours.toFixed(1)}h`}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>sur {activity.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Valeur de ton temps</p>
                      <p className="font-bold text-white">{grindEuros.toFixed(2)}€</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>à {hourlyWage}€/h</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Verdict</p>
                      <p className="font-black text-sm" style={{ color: cheaper === 'grind' ? '#22c55e' : '#EF4444' }}>
                        {cheaper === 'grind' ? '✓ Mieux grinder' : '✗ Card = gain de temps'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 rounded-2xl p-5 text-center" style={{ background: 'rgba(240,192,64,0.06)', border: '1px solid rgba(240,192,64,0.2)' }}>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Ces calculs sont basés sur le prix moyen des Shark Cards. Rockstar propose régulièrement des promotions,attends les soldes (Black Friday, événements GTA) pour les prix les plus bas.
        </p>
      </div>
    </div>
    </>
  )
}

'use client'

import { useState } from 'react'
import { mockVehicles, mockWeapons } from '@/lib/mock-data'
import { Vehicle, Weapon } from '@/types'
import PageHero from '@/components/ui/PageHero'
import ComingSoonNotice from '@/components/ui/ComingSoonNotice'
import PageNextSteps from '@/components/ui/PageNextSteps'

type Mode = 'vehicles' | 'weapons'

export default function ComparePage() {
  const [mode, setMode] = useState<Mode>('vehicles')
  const [leftId, setLeftId] = useState<string>('')
  const [rightId, setRightId] = useState<string>('')

  const items = mode === 'vehicles' ? mockVehicles : mockWeapons
  const left = items.find(i => i.id === leftId) as (Vehicle | Weapon) | undefined
  const right = items.find(i => i.id === rightId) as (Vehicle | Weapon) | undefined

  const statKeys = left ? Object.keys(left.stats) : []

  return (
    <>
      <PageHero title="COMPARATEUR" label="Base de données" image="/images/gameplay1.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
      <ComingSoonNotice message="Le comparateur sera mis à jour avec les données officielles dès la sortie du jeu le 19 novembre 2026. Les statistiques actuelles sont basées sur des estimations pré-lancement." />
      <p className="mb-8" style={{ color: 'var(--text-muted)' }}>Comparez deux véhicules ou armes côte à côte.</p>

      <div className="flex gap-2 mb-8">
        {(['vehicles', 'weapons'] as Mode[]).map((m) => (
          <button key={m} onClick={() => { setMode(m); setLeftId(''); setRightId('') }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${mode === m ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'}`}>
            {m === 'vehicles' ? 'Véhicules' : 'Armes'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {[{ id: leftId, setId: setLeftId, label: 'Élément A' }, { id: rightId, setId: setRightId, label: 'Élément B' }].map(({ id, setId, label }) => (
          <div key={label}>
            <label className="text-gray-400 text-sm mb-2 block">{label}</label>
            <select value={id} onChange={e => setId(e.target.value)}
              className="w-full bg-zinc-800 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400">
              <option value="">Choisir...</option>
              {items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </div>
        ))}
      </div>

      {left && right && (
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-white font-bold text-lg">{left.name}</p>
              <p className="text-gray-400 text-sm">{(left as Vehicle).manufacturer || (left as Weapon).category}</p>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-yellow-400 font-black text-xl">VS</span>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-lg">{right.name}</p>
              <p className="text-gray-400 text-sm">{(right as Vehicle).manufacturer || (right as Weapon).category}</p>
            </div>
          </div>
          <div className="space-y-4">
            {statKeys.map((key) => {
              const lv = (left.stats as unknown as Record<string, number>)[key]
              const rv = (right.stats as unknown as Record<string, number>)[key]
              const winner = lv > rv ? 'left' : rv > lv ? 'right' : 'tie'
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span className={winner === 'left' ? 'text-yellow-400 font-bold' : ''}>{lv}</span>
                    <span className="capitalize">{key.replace('_', ' ')}</span>
                    <span className={winner === 'right' ? 'text-yellow-400 font-bold' : ''}>{rv}</span>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div className="flex-1 bg-zinc-700 rounded-l-full overflow-hidden flex justify-end">
                      <div className={`h-full rounded-l-full ${winner === 'left' ? 'bg-yellow-400' : 'bg-zinc-500'}`} style={{ width: `${lv}%` }} />
                    </div>
                    <div className="flex-1 bg-zinc-700 rounded-r-full overflow-hidden">
                      <div className={`h-full rounded-r-full ${winner === 'right' ? 'bg-yellow-400' : 'bg-zinc-500'}`} style={{ width: `${rv}%` }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {(!left || !right) && (
        <div className="text-center text-gray-600 py-16">Sélectionne deux éléments pour comparer</div>
      )}
    </div>
    </>
  )
}

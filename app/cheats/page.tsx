'use client'

import { useState } from 'react'
import PageHero from '@/components/ui/PageHero'
import ComingSoonNotice from '@/components/ui/ComingSoonNotice'
import PageNextSteps from '@/components/ui/PageNextSteps'

type Platform = 'ps5' | 'xbox' | 'pc'

const cheats: { name: string; effect: string; ps5: string; xbox: string; pc: string; category: string }[] = [
  { name: 'Argent Infini', effect: 'Ajoute $500,000', ps5: 'R1, R2, L1, L2, ←, →, ←, →, ×', xbox: 'RB, RT, LB, LT, ←, →, ←, →, A', pc: 'RICHMAN', category: 'Argent' },
  { name: 'Vie complète', effect: 'Restaure la santé à 100%', ps5: '↑, ×, △, ↓, □, ○, ←, →, L1, R1', xbox: '↑, A, Y, ↓, X, B, ←, →, LB, RB', pc: 'HESOYAM', category: 'Santé' },
  { name: 'Armure complète', effect: 'Armure à 100%', ps5: '↑, ↑, □, ○, ○, ○, □, ○', xbox: '↑, ↑, X, B, B, B, X, B', pc: 'TURTLE', category: 'Santé' },
  { name: 'Toutes les armes', effect: 'Débloquer toutes les armes', ps5: 'R1, R2, L1, R2, ←, ↓, →, ↑, ←, ↓, →, ↑', xbox: 'RB, RT, LB, RT, ←, ↓, →, ↑, ←, ↓, →, ↑', pc: 'TOOLUP', category: 'Armes' },
  { name: 'Recherché Niveau 5', effect: 'Niveau de recherche maximum', ps5: 'R1, R1, ○, R2, →, ←, →, ←, →, ←', xbox: 'RB, RB, B, RT, →, ←, →, ←, →, ←', pc: 'FUGITIVE', category: 'Police' },
  { name: 'Annuler recherche', effect: 'Supprime les étoiles de recherche', ps5: 'R1, R1, ○, R2, ↑, ↓, ↑, ↓, ↑, ↓', xbox: 'RB, RB, B, RT, ↑, ↓, ↑, ↓, ↑, ↓', pc: 'LAWYERUP', category: 'Police' },
  { name: 'Voiture rapide', effect: 'Fait apparaître une supercar', ps5: 'R2, L1, ○, →, L1, R1, →, ↑, ○, R2', xbox: 'RT, LB, B, →, LB, RB, →, ↑, B, RT', pc: 'COMET', category: 'Véhicules' },
  { name: 'Hélicoptère', effect: 'Fait apparaître un hélicoptère', ps5: 'R2, ○, L1, L2, ←, R1, L1, R1, ←', xbox: 'RT, B, LB, LT, ←, RB, LB, RB, ←', pc: 'BUZZOFF', category: 'Véhicules' },
  { name: 'Mode ivre', effect: 'Personnage en état d\'ivresse', ps5: '△, →, →, ←, →, □, ○, ←', xbox: 'Y, →, →, ←, →, X, B, ←', pc: 'LIQUOR', category: 'Fun' },
  { name: 'Slow motion', effect: 'Temps au ralenti', ps5: '△, ←, →, →, □, R2, R1', xbox: 'Y, ←, →, →, X, RT, RB', pc: 'SLOWMO', category: 'Fun' },
  { name: 'Super saut', effect: 'Sauts géants', ps5: '←, ←, △, △, →, →, ←, →, □, R1, R2', xbox: '←, ←, Y, Y, →, →, ←, →, X, RB, RT', pc: 'HOPTOIT', category: 'Fun' },
  { name: 'Parachute', effect: 'Équipe un parachute', ps5: '←, →, L1, L2, R1, R2, R2, ↑, ↓, →', xbox: '←, →, LB, LT, RB, RT, RT, ↑, ↓, →', pc: 'SKYDIVE', category: 'Fun' },
]

const categories = ['Tout', 'Argent', 'Santé', 'Armes', 'Police', 'Véhicules', 'Fun']

export default function CheatsPage() {
  const [platform, setPlatform] = useState<Platform>('ps5')
  const [category, setCategory] = useState('Tout')
  const [copied, setCopied] = useState<string | null>(null)

  const filtered = category === 'Tout' ? cheats : cheats.filter(c => c.category === category)

  const copy = (text: string, name: string) => {
    navigator.clipboard.writeText(text)
    setCopied(name)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <>
      <PageHero title="CODES DE TRICHE" label="Guides" image="/images/gameplay4.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
      <ComingSoonNotice message="Ces codes sont basés sur les patterns des précédents GTA. Ils seront confirmés et mis à jour dès la sortie officielle le 19 novembre 2026." />
      {/* Platform switcher */}
      <div className="flex gap-2 mb-6">
        {(['ps5', 'xbox', 'pc'] as Platform[]).map(p => (
          <button
            key={p}
            onClick={() => setPlatform(p)}
            className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={platform === p
              ? { background: 'var(--accent-gold)', color: '#081E36' }
              : { background: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border)' }
            }
          >
            {p === 'ps5' ? 'PS5' : p === 'xbox' ? 'Xbox' : 'PC'}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
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

      {/* Cheats list */}
      <div className="space-y-3">
        {filtered.map((cheat) => (
          <div key={cheat.name} className="rounded-2xl p-5 flex items-center justify-between gap-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <p className="font-bold text-white">{cheat.name}</p>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(240,192,64,0.12)', color: 'var(--accent-gold)' }}>
                  {cheat.category}
                </span>
              </div>
              <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>{cheat.effect}</p>
              <code className="text-sm font-mono font-bold" style={{ color: 'var(--accent-gold)' }}>
                {cheat[platform]}
              </code>
            </div>
            <button
              onClick={() => copy(cheat[platform], cheat.name)}
              className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={copied === cheat.name
                ? { background: 'rgba(34,197,94,0.2)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.4)' }
                : { background: 'rgba(240,192,64,0.1)', color: 'var(--accent-gold)', border: '1px solid rgba(240,192,64,0.3)' }
              }
            >
              {copied === cheat.name ? '✓ Copié' : 'Copier'}
            </button>
          </div>
        ))}
      </div>

      <p className="text-xs mt-8 text-center" style={{ color: 'var(--text-muted)' }}>
        Codes basés sur les patterns GTA V, à confirmer lors de la sortie officielle le 19 novembre 2026.
      </p>
    </div>
    </>
  )
}

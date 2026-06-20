'use client'

import { useState } from 'react'
import PageHero from '@/components/ui/PageHero'
import ComingSoonNotice from '@/components/ui/ComingSoonNotice'
import PageNextSteps from '@/components/ui/PageNextSteps'

const playstyles = ['Joueur solo', 'PvP agressif', 'Missions coopératives', 'Business / CEO', 'Exploration']
const priorities = ['Vitesse & mobilité', 'Puissance de feu', 'Discrétion', 'Argent & grind', 'Survie']

const builds: Record<string, { vehicle: string; weapon: string; tips: string[] }> = {
  'Joueur solo-Puissance de feu': {
    vehicle: 'Pegassi Zentorno Classic',
    weapon: 'Combat MG Mk II',
    tips: ['Équipe ton véhicule d\'un blindage renforcé', 'Achète la propriété Bunker pour les missions solo', 'Utilise le mode Fantôme pour éviter les griefers'],
  },
  'PvP agressif-Vitesse & mobilité': {
    vehicle: 'Grotti Turismo Omnis',
    weapon: 'Pistol Mk III',
    tips: ['Maîtrise le BST (Bull Shark Testosterone) en combat', 'Apprends les spots de couverture de Vice City', 'Garde toujours un véhicule armé en repli'],
  },
  default: {
    vehicle: 'Grotti Turismo Omnis',
    weapon: 'Pistol Mk III',
    tips: ['Commence par les missions de contact pour farmer de l\'argent', 'Investis dans un appartement avec garage dès le début', 'Rejoins un crew pour les missions coop'],
  },
}

const LIVE = false // Passer à true au lancement de GTA 6

export default function BuildPage() {
  if (!LIVE) return (
    <>
      <PageHero title="OPTIMISEUR DE BUILD" label="Outils" image="/images/gameplay1.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
        <ComingSoonNotice />
      </div>
    </>
  )

  const [playstyle, setPlaystyle] = useState('')
  const [priority, setPriority] = useState('')
  const [result, setResult] = useState<typeof builds[string] | null>(null)

  const generate = () => {
    const key = `${playstyle}-${priority}`
    setResult(builds[key] || builds.default)
  }

  return (
    <>
      <PageHero title="OPTIMISEUR DE BUILD" label="Outils" image="/images/gameplay1.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
      <ComingSoonNotice message="L'optimiseur de build sera disponible après la sortie du jeu. Les recommandations actuelles sont basées sur les mécaniques connues de GTA V." />
      <p className="mb-8" style={{ color: 'var(--text-muted)' }}>Dis-nous comment tu joues, on te propose le meilleur setup.</p>

      <div className="space-y-6 mb-8">
        <div>
          <label className="text-white font-semibold mb-3 block">Ton style de jeu</label>
          <div className="flex flex-wrap gap-2">
            {playstyles.map(p => (
              <button key={p} onClick={() => setPlaystyle(p)}
                className={`px-4 py-2 rounded-xl text-sm transition-colors ${playstyle === p ? 'bg-yellow-400 text-black font-bold' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-white font-semibold mb-3 block">Ta priorité</label>
          <div className="flex flex-wrap gap-2">
            {priorities.map(p => (
              <button key={p} onClick={() => setPriority(p)}
                className={`px-4 py-2 rounded-xl text-sm transition-colors ${priority === p ? 'bg-yellow-400 text-black font-bold' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <button onClick={generate} disabled={!playstyle || !priority}
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-yellow-300 transition-colors">
          Générer mon build
        </button>
      </div>

      {result && (
        <div className="bg-zinc-900 border border-yellow-400/30 rounded-2xl p-6 space-y-6">
          <h2 className="text-yellow-400 font-bold text-lg">Ton build recommandé</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs uppercase font-semibold mb-1">Véhicule principal</p>
              <p className="text-white font-bold">{result.vehicle}</p>
            </div>
            <div className="bg-zinc-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs uppercase font-semibold mb-1">Arme principale</p>
              <p className="text-white font-bold">{result.weapon}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase font-semibold mb-3">Conseils</p>
            <ul className="space-y-2">
              {result.tips.map((tip, i) => (
                <li key={i} className="flex gap-2 text-white text-sm">
                  <span className="text-yellow-400 flex-shrink-0">→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

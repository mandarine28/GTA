'use client'

import { useState } from 'react'
import PageHero from '@/components/ui/PageHero'
import ComingSoonNotice from '@/components/ui/ComingSoonNotice'
import PageNextSteps from '@/components/ui/PageNextSteps'

const missions = [
  { id: '1', name: 'Coup d\'éclat à Vice City', difficulty: 'Difficile', reward: '180 000 GTA$', type: 'Braquage' },
  { id: '2', name: 'Livraison spéciale', difficulty: 'Moyen', reward: '45 000 GTA$', type: 'Contact' },
  { id: '3', name: 'Course nocturne', difficulty: 'Facile', reward: '22 000 GTA$', type: 'Course' },
]

const difficultyColor: Record<string, string> = {
  'Facile': 'text-green-400 bg-green-400/10',
  'Moyen': 'text-yellow-400 bg-yellow-400/10',
  'Difficile': 'text-red-400 bg-red-400/10',
}

const LIVE = false // Passer à true au lancement de GTA 6

export default function MissionsPage() {
  if (!LIVE) return (
    <>
      <PageHero title="MISSIONS" label="Guides" image="/images/gameplay1.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
        <ComingSoonNotice />
      </div>
    </>
  )

  const [selected, setSelected] = useState<string | null>(null)
  const [guide, setGuide] = useState<string | null>(null)

  const generateGuide = (missionName: string) => {
    setGuide(`**Guide : ${missionName}**\n\n1. Prépare un véhicule rapide avant de lancer la mission.\n2. Assure-toi d'avoir suffisamment de munitions et d'armure.\n3. Suis les marqueurs sur la mini-carte.\n4. Reste couvert pendant les fusillades — utilise l'environnement.\n5. Une fois l'objectif atteint, retourne au point de dépôt pour valider.\n\n💡 Astuce : En équipe, répartissez les rôles (chauffeur, tireur, couverture) pour plus d'efficacité.`)
  }

  return (
    <>
      <PageHero title="MISSIONS" label="Guides" image="/images/gameplay1.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
      <ComingSoonNotice message="Les guides de missions seront rédigés dès la sortie du jeu le 19 novembre 2026, au fil de la progression de notre équipe." />
      <p className="mb-8" style={{ color: 'var(--text-muted)' }}>Sélectionne une mission pour obtenir un guide détaillé.</p>

      <div className="space-y-3 mb-8">
        {missions.map((mission) => (
          <div key={mission.id}
            onClick={() => { setSelected(mission.id); setGuide(null) }}
            className={`bg-zinc-900 border rounded-2xl p-5 cursor-pointer transition-colors ${selected === mission.id ? 'border-yellow-400' : 'border-white/10 hover:border-white/30'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white font-semibold">{mission.name}</h2>
                <p className="text-gray-400 text-sm mt-1">{mission.type}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400 font-semibold text-sm">{mission.reward}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${difficultyColor[mission.difficulty]}`}>{mission.difficulty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && !guide && (
        <button onClick={() => generateGuide(missions.find(m => m.id === selected)!.name)}
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition-colors">
          Générer le guide
        </button>
      )}

      {guide && (
        <div className="bg-zinc-900 border border-yellow-400/30 rounded-2xl p-6">
          <div className="prose prose-invert max-w-none">
            {guide.split('\n').map((line, i) => (
              <p key={i} className={`text-sm ${line.startsWith('**') ? 'text-yellow-400 font-bold text-base' : line.startsWith('💡') ? 'text-blue-400' : 'text-gray-300'}`}>
                {line.replace(/\*\*/g, '')}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  )
}

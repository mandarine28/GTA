import { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import ComingSoonNotice from '@/components/ui/ComingSoonNotice'
import PageNextSteps from '@/components/ui/PageNextSteps'

export const metadata: Metadata = {
  title: 'Glitches GTA 6 - Actifs et vérifiés',
}

const glitches = [
  {
    name: 'Money Glitch - Session Publique',
    status: 'actif',
    version: '1.0.0',
    type: 'Argent',
    difficulty: 'Facile',
    risk: 'Faible',
    steps: [
      'Rejoins une session publique avec au moins 2 joueurs',
      'Va dans le menu du téléphone, Rockstar Editor',
      'Lance une Capture en solo',
      'Termine la Capture immédiatement',
      'Répète 3x, le bonus de série s\'accumule sans fin',
    ],
    notes: 'Environ $15,000 par cycle de 3 minutes. Ne marche qu\'en session publique.',
  },
  {
    name: 'Duplicate Vehicle (Garage Glitch)',
    status: 'patché',
    version: '1.0.2',
    type: 'Véhicules',
    difficulty: 'Moyen',
    risk: 'Moyen',
    steps: [
      'Stationne la voiture à dupliquer devant un garage',
      'Entre dans le garage avec une autre voiture',
      'Sors immédiatement du garage en courant (pas en voiture)',
      'Monte dans la voiture cible et entre très rapidement',
      'Si timing correct, deux voitures identiques dans le garage',
    ],
    notes: 'Patché dans la 1.0.3. Garde-le en référence si rollback serveur.',
  },
  {
    name: 'RP Infini - Mission Réseau',
    status: 'actif',
    version: '1.0.0',
    type: 'RP',
    difficulty: 'Très facile',
    risk: 'Faible',
    steps: [
      'Lance la mission "Réseau Intérieur" (niveau 12 requis)',
      'Fonce vers le premier objectif sans éliminer personne',
      'Retourne au point de départ sans compléter',
      'Répète, le RP de déplacement se cumule à l\'infini',
    ],
    notes: '~2,000 RP par cycle de 90 secondes. Idéal pour débloquer les rangs rapidement.',
  },
  {
    name: 'Invisibilité Temporaire',
    status: 'inconnu',
    version: '1.0.0',
    type: 'Fun',
    difficulty: 'Difficile',
    risk: 'Élevé',
    steps: [
      'Rejoins une session avec exactement 29 joueurs',
      'Meurs au moment précis où un joueur rejoint (30e joueur)',
      'Au respawn, ton personnage peut être invisible pour les autres',
      'Non confirmé de manière consistante, peut dépendre des serveurs',
    ],
    notes: 'Non vérifié de manière fiable. À tester avec précaution. Risque de ban non confirmé.',
  },
]

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  actif: { label: 'ACTIF', color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  patché: { label: 'PATCHÉ', color: '#EF4444', bg: 'rgba(239,68,68,0.12)' },
  inconnu: { label: 'INCONNU', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
}

const riskConfig: Record<string, string> = {
  Faible: '#22c55e',
  Moyen: '#F59E0B',
  Élevé: '#EF4444',
}

const LIVE = false // Passer à true au lancement de GTA 6

export default function GlitchesPage() {
  if (!LIVE) return (
    <>
      <PageHero title="GLITCHES" label="Guides" image="/images/gameplay5.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
        <ComingSoonNotice />
      </div>
    </>
  )

  return (
    <>
      <PageHero title="GLITCHES" label="Guides" image="/images/gameplay5.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
      <ComingSoonNotice message="Aucun glitch n'est connu pour l'instant, le jeu n'étant pas encore sorti. Cette section sera mise à jour dans les heures suivant le lancement." />
      {/* Warning */}
      <div className="rounded-2xl p-4 mb-8" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)' }}>
        <p className="text-sm" style={{ color: 'rgba(245,158,11,0.9)' }}>
          Attention : l'utilisation de glitches peut entraîner des sanctions selon les conditions d'utilisation de Rockstar. Utilisez à vos risques. Nous mettons à jour cette liste après chaque patch.
        </p>
      </div>

      {/* Glitches */}
      <div className="space-y-6">
        {glitches.map((glitch) => {
          const status = statusConfig[glitch.status]
          return (
            <div key={glitch.name} className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="p-5 border-b flex items-start justify-between gap-4" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="text-xs font-black tracking-widest px-2.5 py-1 rounded-full" style={{ background: status.bg, color: status.color }}>
                      {status.label}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}>
                      {glitch.type}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>v{glitch.version}</span>
                  </div>
                  <h2 className="text-xl font-black text-white">{glitch.name}</h2>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-muted)' }}>Risque</p>
                  <p className="text-sm font-bold" style={{ color: riskConfig[glitch.risk] }}>{glitch.risk}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-bold tracking-wider uppercase mb-3" style={{ color: 'var(--accent-gold)' }}>Étapes</p>
                <ol className="space-y-2 mb-4">
                  {glitch.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black" style={{ background: 'rgba(240,192,64,0.15)', color: 'var(--accent-gold)' }}>
                        {i + 1}
                      </span>
                      <span style={{ color: 'var(--text-warm)' }}>{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{glitch.notes}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-xs mt-10 text-center" style={{ color: 'var(--text-muted)' }}>
        Dernière vérification : Juin 2026, mis à jour après chaque patch Rockstar
      </p>
    </div>
    </>
  )
}

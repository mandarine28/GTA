import Link from 'next/link'
import { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import ComingSoonNotice from '@/components/ui/ComingSoonNotice'
import PageNextSteps from '@/components/ui/PageNextSteps'

export const metadata: Metadata = {
  title: 'Gagner de l\'argent GTA 6',
}

const methods = [
  {
    rank: 1,
    name: 'Cayo Perico Heist',
    revenue: '$1.4M/h',
    type: 'Heist',
    time: '65 min',
    players: 'Solo',
    tags: ['Meilleur ratio', 'Solo'],
    tip: 'Ciblez toujours le Panthère Rose ou le Sarcophage pour maximiser. Approche Élite = bonus.',
  },
  {
    rank: 2,
    name: 'Diamond Casino Heist',
    revenue: '$980K/h',
    type: 'Heist',
    time: '90 min',
    players: '2-4',
    tags: ['Gros payout', 'Multi'],
    tip: 'Vault avec Diamonds (event limité) = 2.5M à partager. Approche Undetected conseillée.',
  },
  {
    rank: 3,
    name: 'Acid Lab + MC',
    revenue: '$510K/h',
    type: 'Passif',
    time: 'Passif',
    players: 'Solo',
    tags: ['Passif', 'Combo'],
    tip: 'Lance l\'Acid Lab et les MC Business, puis fait du Cayo pendant que ça tourne en fond.',
  },
  {
    rank: 4,
    name: 'Auto Shop Contracts',
    revenue: '$280K/h',
    type: 'Missions',
    time: '30 min',
    players: '1-4',
    tags: ['Débutant', 'Stable'],
    tip: 'Idéal pour débuter. Bonus CEO si vous avez un bureau. Travaillez en duo pour la vitesse.',
  },
  {
    rank: 5,
    name: 'VIP Work - Headhunter',
    revenue: '$220K/h',
    type: 'VIP',
    time: '20 min',
    players: 'Solo',
    tags: ['Rapide', 'Solo'],
    tip: '4 cibles en hélicoptère. La méthode la plus rapide par run. Enchaîne en boucle.',
  },
  {
    rank: 6,
    name: 'Nightclub (passif)',
    revenue: '$50K/h',
    type: 'Passif',
    time: 'AFK',
    players: 'Solo',
    tags: ['AFK', 'Passif'],
    tip: 'Zéro effort si les stocks sont linkés. Active le Nightclub et oublie-le pendant d\'autres activités.',
  },
]

const LIVE = false // Passer à true au lancement de GTA 6

export default function MoneyPage() {
  if (!LIVE) return (
    <>
      <PageHero title="GAGNER DE L'ARGENT" label="Guides" image="/images/gameplay6.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
        <ComingSoonNotice />
      </div>
    </>
  )

  return (
    <>
      <PageHero title="GAGNER DE L'ARGENT" label="Guides" image="/images/gameplay6.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
      <ComingSoonNotice message="Les méthodes pour gagner de l'argent seront documentées dès les premières heures après la sortie du jeu. Les données actuelles sont indicatives." />
      {/* Strategy tip */}
      <div className="rounded-2xl p-5 mb-8" style={{ background: 'rgba(240,192,64,0.06)', border: '1px solid rgba(240,192,64,0.25)' }}>
        <p className="font-bold text-white mb-1">Stratégie optimale</p>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Lance l'Acid Lab + MC en passif, enchaîne les runs Cayo Perico, reviens vendre quand les stocks sont pleins.
          Avec cette rotation, tu peux atteindre <strong style={{ color: 'var(--accent-gold)' }}>$1.8M-$2M/h</strong> en combinant actif + passif.
        </p>
      </div>

      {/* Methods */}
      <div className="space-y-4">
        {methods.map((method) => (
          <div key={method.name} className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 font-black text-lg" style={{ background: method.rank === 1 ? 'var(--accent-gold)' : 'rgba(255,255,255,0.08)', color: method.rank === 1 ? '#081E36' : 'var(--text-muted)' }}>
                {method.rank}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <p className="font-black text-white text-lg">{method.name}</p>
                  {method.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>{method.tip}</p>
                <div className="flex gap-6 flex-wrap">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>Revenu</p>
                    <p className="font-black" style={{ color: 'var(--accent-gold)' }}>{method.revenue}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>Durée</p>
                    <p className="font-bold text-white">{method.time}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>Joueurs</p>
                    <p className="font-bold text-white">{method.players}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>Type</p>
                    <p className="font-bold text-white">{method.type}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/business-calc" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm" style={{ background: 'var(--accent-gold)', color: '#081E36' }}>
          Calculateur de revenu par heure
        </Link>
      </div>
    </div>
    </>
  )
}

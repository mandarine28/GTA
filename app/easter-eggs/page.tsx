import { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import ComingSoonNotice from '@/components/ui/ComingSoonNotice'
import PageNextSteps from '@/components/ui/PageNextSteps'

export const metadata: Metadata = {
  title: 'Easter Eggs GTA 6 - Secrets et références cachées',
}

const eggs = [
  {
    name: 'La statue de Leonida',
    category: 'Référence',
    location: 'Centre de Port Gellhorn',
    discovered: 'Trailer #1',
    spoiler: false,
    desc: 'Une statue géante tenant un ananas, référence à la culture kitsch de la Floride dans les années 80. L\'ananas est un clin d\'oeil récurrent dans la franchise depuis Vice City.',
  },
  {
    name: 'Le téléphone "Cluckin\' Bell"',
    category: 'Marque fictive',
    location: 'Publicités TV',
    discovered: 'Trailer #2',
    spoiler: false,
    desc: 'Cluckin\' Bell, la chaîne de fast-food fictive de la franchise, fait son retour avec une campagne marketing parodiant les influenceurs food. L\'emballage est visible dans de nombreuses scènes.',
  },
  {
    name: 'Photo de Carl Johnson',
    category: 'Hommage',
    location: 'Appartement de Lucia',
    discovered: 'Screenshot officiel',
    spoiler: false,
    desc: 'Une photo encadrée ressemblant à CJ (GTA San Andreas) est visible sur un mur dans l\'appartement de Lucia. Hommage discret au personnage le plus aimé de la franchise.',
  },
  {
    name: 'Le journal "UFO Spotted over Vice City"',
    category: 'Mystère',
    location: 'Boutiques de journaux',
    discovered: 'Communauté (beta)',
    spoiler: true,
    desc: 'Un journal avec le titre "UFO Spotted Over Vice City" est visible dans certaines boutiques. Aucun UFO confirmé dans le jeu pour le moment, la communauté cherche encore.',
  },
  {
    name: 'Graffiti "GTA V Was Better"',
    category: 'Meta humour',
    location: 'Rue Port Gellhorn Sud',
    discovered: 'Communauté',
    spoiler: false,
    desc: 'Rockstar se moque d\'eux-mêmes avec un graffiti lisible sur un mur : "GTA V Was Better". Typique du méta-humour de la franchise.',
  },
  {
    name: 'Musique "Welcome to the Jungle" distordue',
    category: 'Audio',
    location: 'Radio lors d\'une poursuite',
    discovered: 'Communauté (beta)',
    spoiler: false,
    desc: 'Lors de certaines poursuites à 5 étoiles, une version distordue de "Welcome to the Jungle" se met à jouer sur la radio, mais aucune station n\'est affichée. Phénomène inexpliqué.',
  },
]

const LIVE = false // Passer à true au lancement de GTA 6

const LIVE = false // Passer à true au lancement de GTA 6

export default function EasterEggsPage() {
  if (!LIVE) return (
    <>
      <PageHero title="EASTER EGGS" label="Guides" image="/images/gameplay4.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
        <ComingSoonNotice />
      </div>
    </>
  )
  if (!LIVE) return (
    <>
      <PageHero title="EASTER EGGS" label="Guides" image="/images/gameplay4.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
        <ComingSoonNotice />
      </div>
    </>
  )

  return (
    <>
      <PageHero title="EASTER EGGS" label="Guides" image="/images/gameplay4.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
      <ComingSoonNotice message="Aucun easter egg n'a encore été découvert — le jeu n'est pas sorti. Cette section sera enrichie en temps réel après le lancement." />
      {/* Spoiler warning */}
      <div className="rounded-2xl p-4 mb-8" style={{ background: 'rgba(139,31,165,0.08)', border: '1px solid rgba(139,31,165,0.3)' }}>
        <p className="text-sm" style={{ color: 'rgba(200,150,220,0.9)' }}>
          Certains easter eggs contiennent des <strong>spoilers</strong> scénaristiques. Ils sont marqués, à lire en connaissance de cause.
        </p>
      </div>

      {/* Eggs */}
      <div className="space-y-5">
        {eggs.map((egg) => (
          <div key={egg.name} className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-black text-white text-lg">{egg.name}</p>
                    {egg.spoiler && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(139,31,165,0.2)', color: '#C084FC' }}>
                        SPOILER
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(240,192,64,0.12)', color: 'var(--accent-gold)' }}>
                      {egg.category}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{egg.location}</span>
                  </div>
                </div>
                <span className="text-xs flex-shrink-0" style={{ color: 'var(--text-muted)' }}>Trouvé : {egg.discovered}</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-warm)' }}>{egg.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
        <p className="font-bold text-white mb-2">Tu as trouvé un easter egg ?</p>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          La liste est mise à jour régulièrement par la communauté. Reviens après la sortie officielle le <strong style={{ color: 'var(--accent-gold)' }}>19 novembre 2026</strong>.
        </p>
      </div>
    </div>
    </>
  )
}

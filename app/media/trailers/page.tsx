import { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import PageNextSteps from '@/components/ui/PageNextSteps'

export const metadata: Metadata = {
  title: 'Trailers GTA 6 -Toutes les vidéos officielles',
}

const trailers = [
  {
    id: 'QdBZpzeXZXU',
    title: 'GTA VI -Trailer Officiel #1',
    date: '5 décembre 2023',
    views: '200M+ vues',
    desc: 'Le premier trailer officiel de GTA 6, diffusé par surprise sur la chaîne Rockstar Games. Révèle Jason, Lucia, Vice City, et donne le ton du jeu.',
    highlights: ['Première apparition de Lucia', 'Vice City confirmée', 'Premières images in-game'],
    duration: '1:31',
  },
  {
    id: 'fyRD7JTzRaI',
    title: 'GTA VI -Trailer Officiel #2',
    date: 'Mai 2024',
    views: '180M+ vues',
    desc: 'Second trailer dévoilant davantage de gameplay, les deux protagonistes en action, et de nouveaux districts de Leonida.',
    highlights: ['Jason et Lucia ensemble', 'Mécaniques de gameplay', 'Date de sortie 2025 confirmée'],
    duration: '2:15',
  },
]

export default function TrailersPage() {
  return (
    <>
      <PageHero title="TRAILERS" label="Médias" image="/images/gameplay3.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
      <div className="space-y-10">
        {trailers.map((trailer) => (
          <div key={trailer.id} className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            {/* Video embed */}
            <div className="relative w-full" style={{ aspectRatio: '16/9', background: '#000' }}>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.id}`}
                title={trailer.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-black text-white text-xl mb-1">{trailer.title}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{trailer.date}</span>
                    <span className="text-sm" style={{ color: 'var(--accent-gold)' }}>{trailer.views}</span>
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{trailer.duration}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-warm)' }}>{trailer.desc}</p>

              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--accent-gold)' }}>Points clés</p>
                <div className="flex flex-wrap gap-2">
                  {trailer.highlights.map(h => (
                    <span key={h} className="text-xs px-3 py-1.5 rounded-full font-semibold" style={{ background: 'rgba(240,192,64,0.1)', color: 'var(--accent-gold)', border: '1px solid rgba(240,192,64,0.25)' }}>
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

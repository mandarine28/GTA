import Image from 'next/image'
import { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import PageNextSteps from '@/components/ui/PageNextSteps'

export const metadata: Metadata = {
  title: 'Screenshots & Artworks GTA 6 — Images officielles HD',
}

const screenshots = [
  { src: '/images/gameplay1.jpg', alt: 'GTA 6 Vice City', label: 'Vice City au coucher du soleil', type: 'Screenshot officiel' },
  { src: '/images/gameplay2.jpg', alt: 'GTA 6 Gameplay', label: 'Jason et Lucia en action', type: 'Screenshot officiel' },
  { src: '/images/gameplay3.jpg', alt: 'GTA 6 Open World', label: 'Les Everglades de Leonida', type: 'Screenshot officiel' },
  { src: '/images/gameplay4.jpg', alt: 'GTA 6 Vehicles', label: 'Supercars sur la côte', type: 'Screenshot officiel' },
  { src: '/images/gameplay5.jpg', alt: 'GTA 6 Night', label: 'Vice City by night', type: 'Screenshot officiel' },
  { src: '/images/gameplay6.jpg', alt: 'GTA 6 Water', label: 'Navigation en mer', type: 'Screenshot officiel' },
]

export default function ScreenshotsPage() {
  return (
    <>
      <PageHero title="SCREENSHOTS & ARTWORKS" label="Médias" image="/images/gameplay2.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {screenshots.map((shot, i) => (
          <div key={i} className="group relative rounded-2xl overflow-hidden cursor-pointer" style={{ aspectRatio: '16/9', background: 'var(--bg-card)' }}>
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(8,30,54,0.7)' }} />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <p className="font-bold text-white text-sm">{shot.label}</p>
              <p className="text-xs" style={{ color: 'var(--accent-gold)' }}>{shot.type}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Galerie complète disponible à partir de la sortie du jeu — <strong style={{ color: 'var(--accent-gold)' }}>19 novembre 2026</strong>
        </p>
      </div>
    </div>
    </>
  )
}

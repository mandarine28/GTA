import Link from 'next/link'
import Image from 'next/image'
import { getVehicles } from '@/lib/db'
import PageHero from '@/components/ui/PageHero'
import ComingSoonNotice from '@/components/ui/ComingSoonNotice'
import PageNextSteps from '@/components/ui/PageNextSteps'

const bgImages = ['/images/gameplay1.jpg', '/images/gameplay4.jpg', '/images/gameplay5.jpg']
const categoryColors: Record<string, string> = {
  supercar: '#F0C040', muscle: '#E05030', motorcycle: '#8B1FA5', truck: '#3080E0', suv: '#20A060',
}

const LIVE = false // Passer à true au lancement de GTA 6

export default async function VehiclesPage() {
  if (!LIVE) return (
    <>
      <PageHero title="VÉHICULES GTA VI" label="Base de données" image="/images/gameplay5.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
        <ComingSoonNotice />
      </div>
    </>
  )

  const vehicles = await getVehicles()
  return (
    <>
      <PageHero title="VÉHICULES GTA VI" label="Base de données" image="/images/gameplay5.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v, idx) => (
            <Link
              key={v.id}
              href={`/database/vehicles/${v.slug}`}
              className="group rounded-2xl overflow-hidden block transition-transform hover:-translate-y-1"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <div className="relative h-44 overflow-hidden">
                <Image src={bgImages[idx % bgImages.length]} alt={v.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, var(--bg-card) 0%, rgba(15,40,64,0.4) 100%)' }} />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-xs font-black uppercase px-2 py-1 rounded-lg" style={{ background: categoryColors[v.category] || '#F0C040', color: '#081E36' }}>{v.category}</span>
                </div>
                {v.top_speed && (
                  <div className="absolute bottom-3 right-3 text-right">
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Vitesse max</p>
                    <p className="font-black text-lg" style={{ color: 'var(--accent-gold)' }}>{v.top_speed}</p>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h2 className="font-black text-xl text-white mb-1 group-hover:opacity-80 transition-opacity">{v.name}</h2>
                <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{v.manufacturer}</p>
                <div className="space-y-2 mb-4">
                  {Object.entries(v.stats).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                        <span className="capitalize">{key}</span>
                        <span className="font-bold text-white">{value}</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <div className="h-1.5 rounded-full transition-all" style={{ width: `${value}%`, background: 'var(--accent-gold)' }} />
                      </div>
                    </div>
                  ))}
                </div>
                {v.price_online && (
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Prix GTA Online</span>
                    <span className="font-black" style={{ color: 'var(--accent-gold)' }}>{v.price_online.toLocaleString('fr-FR')} GTA$</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        <PageNextSteps steps={[
          { href: '/database/weapons', label: 'Base de données', title: 'Armes GTA VI', desc: 'Stats, dégâts et portée', image: '/images/gameplay6.jpg' },
          { href: '/compare', label: 'Outils', title: 'Comparateur', desc: 'Comparez côte à côte', image: '/images/gameplay3.jpg' },
        ]} />
      </div>
    </>
  )
}

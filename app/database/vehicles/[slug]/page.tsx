import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getVehicles, getVehicleBySlug } from '@/lib/db'
import PageNextSteps from '@/components/ui/PageNextSteps'

const bgImages = ['/images/gameplay1.jpg', '/images/gameplay4.jpg', '/images/gameplay5.jpg']

const categoryColors: Record<string, string> = {
  supercar: '#F0C040', muscle: '#E05030', motorcycle: '#8B1FA5', truck: '#3080E0', suv: '#20A060',
}

const statLabels: Record<string, string> = {
  speed: 'Vitesse', acceleration: 'Accélération', handling: 'Maniabilité', braking: 'Freinage', traction: 'Traction',
}

export async function generateStaticParams() {
  const vehicles = await getVehicles()
  return vehicles.map(v => ({ slug: v.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const vehicle = await getVehicleBySlug(slug)
  if (!vehicle) return {}
  return {
    title: `${vehicle.name} - Véhicules GTA VI - Grand Theft Info`,
    description: vehicle.description ?? `Stats et prix du ${vehicle.name} dans GTA VI.`,
  }
}

export default async function VehiclePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const vehicle = await getVehicleBySlug(slug)
  if (!vehicle) notFound()

  const idx = 0
  const img = bgImages[idx % bgImages.length]
  const color = categoryColors[vehicle.category] || '#F0C040'

  return (
    <div>
      {/* HERO */}
      <div className="relative w-full overflow-hidden" style={{ height: 380 }}>
        <Image src={img} alt={vehicle.name} fill className="object-cover" priority />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(6,15,28,0.97) 0%, rgba(6,15,28,0.6) 60%, rgba(6,15,28,0.2) 100%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(0deg, rgba(6,15,28,1) 0%, transparent 40%)' }}
        />

        <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-4 pb-10">
          <div className="mb-5">
            <Link
              href="/database/vehicles"
              className="inline-flex items-center gap-2 text-xs font-semibold transition-opacity hover:opacity-70"
              style={{ color: 'var(--text-muted)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Véhicules
            </Link>
          </div>

          <span
            className="inline-block text-[10px] font-black tracking-[0.25em] uppercase px-3 py-1.5 rounded-full mb-3"
            style={{ background: color, color: '#081E36' }}
          >
            {vehicle.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase leading-none">
            {vehicle.name}
          </h1>
          <p className="text-base mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {vehicle.manufacturer}
          </p>
        </div>
      </div>

      {/* CONTENU */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10">

          {/* MAIN */}
          <div>
            {/* Description */}
            {vehicle.description && (
              <section className="mb-10">
                <h2 className="text-xl font-black uppercase mb-4" style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
                  Description
                </h2>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                  {vehicle.description}
                </p>
              </section>
            )}

            {/* Stats */}
            <section className="mb-10">
              <h2 className="text-xl font-black uppercase mb-6" style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
                Performances
              </h2>
              <div className="space-y-5">
                {Object.entries(vehicle.stats).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-sm font-semibold text-white">{statLabels[key] ?? key}</span>
                      <span className="text-xl font-black tabular-nums" style={{ color }}>{value}<span className="text-xs font-normal ml-0.5" style={{ color: 'var(--text-muted)' }}>/100</span></span>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Galerie */}
            <section>
              <h2 className="text-xl font-black uppercase mb-5" style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
                Galerie
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {bgImages.map((src, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '16/10' }}>
                    <Image src={src} alt={`${vehicle.name} - ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR */}
          <aside>
            <div className="rounded-2xl overflow-hidden sticky top-24" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs font-black tracking-[0.2em] uppercase mb-4" style={{ color }}>
                  Fiche technique
                </p>

                {[
                  { key: 'Fabricant', val: vehicle.manufacturer },
                  { key: 'Catégorie', val: vehicle.category },
                  ...(vehicle.top_speed ? [{ key: 'Vitesse max', val: vehicle.top_speed }] : []),
                ].map(row => (
                  <div key={row.key} className="py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--text-muted)' }}>{row.key}</p>
                    <p className="text-sm font-semibold text-white capitalize">{row.val}</p>
                  </div>
                ))}
              </div>

              {vehicle.price_online && (
                <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Prix GTA Online</p>
                  <p className="text-2xl font-black" style={{ color }}>{vehicle.price_online.toLocaleString('fr-FR')}<span className="text-sm font-medium ml-1" style={{ color: 'var(--text-muted)' }}>GTA$</span></p>
                </div>
              )}

              <div className="p-5">
                <Link
                  href="/compare"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 20V10M12 20V4M6 20v-6" />
                  </svg>
                  Comparer ce véhicule
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <PageNextSteps steps={[
          { href: '/database/vehicles', label: 'Base de données', title: 'Tous les véhicules', desc: 'Stats et prix complets', image: '/images/gameplay4.jpg' },
          { href: '/database/weapons', label: 'Base de données', title: 'Armes GTA VI', desc: 'Dégâts, portée, cadence', image: '/images/gameplay6.jpg' },
          { href: '/compare', label: 'Outils', title: 'Comparateur', desc: 'Côte à côte en temps réel', image: '/images/gameplay5.jpg' },
        ]} />
      </div>
    </div>
  )
}

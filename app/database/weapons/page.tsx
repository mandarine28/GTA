import { getWeapons } from '@/lib/db'
import PageHero from '@/components/ui/PageHero'
import PageNextSteps from '@/components/ui/PageNextSteps'

const categoryColor: Record<string, string> = {
  assault_rifle: '#EF4444',
  pistol: '#F59E0B',
  sniper: '#8B1FA5',
  shotgun: '#F97316',
  smg: '#10B981',
  heavy: '#EF4444',
  melee: '#6B7280',
}

export default async function WeaponsPage() {
  const weapons = await getWeapons()
  return (
    <>
      <PageHero title="ARMES GTA VI" label="Base de données" image="/images/gameplay6.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-0">
        {weapons.map((weapon) => {
          const color = categoryColor[weapon.category] || '#F0C040'
          return (
            <div key={weapon.id} className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              {/* Header visual */}
              <div className="relative p-5 pb-4" style={{ background: `linear-gradient(135deg, rgba(15,40,64,1) 0%, ${color}18 100%)`, borderBottom: '1px solid var(--border)' }}>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-black text-xl text-white">{weapon.name}</h2>
                    <p className="text-xs font-bold uppercase tracking-widest mt-0.5" style={{ color }}>
                      {weapon.category.replace('_', ' ')}
                    </p>
                  </div>
                  {weapon.ammo_capacity && (
                    <div className="text-right">
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Chargeur</p>
                      <p className="font-black text-xl text-white">{weapon.ammo_capacity}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>coups</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="p-5">
                <div className="space-y-3 mb-4">
                  {Object.entries(weapon.stats).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="capitalize font-semibold" style={{ color: 'var(--text-muted)' }}>{key.replace('_', ' ')}</span>
                        <span className="font-black" style={{ color: value >= 80 ? '#22c55e' : value >= 50 ? 'var(--accent-gold)' : 'var(--text-muted)' }}>{value}</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <div className="h-1.5 rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
                      </div>
                    </div>
                  ))}
                </div>

                {weapon.price && (
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Prix Ammu-Nation</span>
                    <span className="font-black" style={{ color: 'var(--accent-gold)' }}>
                      {weapon.price.toLocaleString('fr-FR')} GTA$
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <PageNextSteps steps={[
        { href: '/database/vehicles', label: 'Base de données', title: 'Véhicules GTA VI', desc: 'Stats et prix complets', image: '/images/gameplay5.jpg' },
        { href: '/compare', label: 'Outils', title: 'Comparateur', desc: 'Comparez armes et véhicules', image: '/images/gameplay3.jpg' },
      ]} />
    </div>
    </>
  )
}

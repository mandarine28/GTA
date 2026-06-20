import { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import PageNextSteps from '@/components/ui/PageNextSteps'

export const metadata: Metadata = {
  title: 'Éditions GTA 6 — Standard, Deluxe, Ultimate',
}

const editions = [
  {
    name: 'GTA VI STANDARD',
    price: '69.00€',
    desc: 'Parfait pour les joueurs qui veulent le jeu complet sans contenu cosmétique additionnel',
    featured: false,
    items: [
      { label: 'Jeu complet', active: true },
      { label: 'Accès anticipé 3 jours', active: true },
      { label: 'GTA Online inclus', active: true },
      { label: 'Contenu bonus histoire', active: false },
      { label: '3 véhicules exclusifs', active: false },
    ],
    ctaLabel: 'Précommander',
  },
  {
    name: 'GTA VI Deluxe',
    price: '89.00€',
    desc: 'Parfait pour les joueurs qui veulent le jeu complet sans contenu cosmétique additionnel',
    featured: true,
    items: [
      { label: 'Jeu complet', active: true },
      { label: 'Accès anticipé 3 jours', active: true },
      { label: 'GTA Online inclus', active: true },
      { label: 'Contenu bonus histoire', active: true },
      { label: '3 véhicules exclusifs', active: true },
    ],
    ctaLabel: 'Précommander maintenant',
  },
  {
    name: 'GTA VI ULTIMATE',
    price: '129.00€',
    desc: 'Parfait pour les joueurs qui veulent le jeu complet sans contenu cosmétique additionnel',
    featured: false,
    items: [
      { label: 'Jeu complet', active: true },
      { label: 'Accès anticipé 3 jours', active: true },
      { label: 'GTA Online inclus', active: true },
      { label: 'Contenu bonus histoire', active: true },
      { label: '3 véhicules exclusifs', active: true },
    ],
    ctaLabel: 'Précommander',
  },
]

export default function ConfigPage() {
  return (
    <>
      <PageHero title="ÉDITIONS" label="Jeu" image="/images/gameplay3.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
      <div className="flex gap-8 items-stretch justify-center">
        {editions.map((edition) => (
          <div
            key={edition.name}
            className="flex-1 max-w-md flex flex-col rounded-[22px] overflow-hidden"
            style={
              edition.featured
                ? {
                    background: 'rgba(109,1,109,0.17)',
                    border: '2.1px solid #f7cc7f',
                    padding: '33px',
                  }
                : {
                    background: 'rgba(109,1,109,0.06)',
                    border: '1px solid rgba(255,253,235,0.1)',
                    boxShadow: '0px 4px 20px 0px rgba(255,253,235,0.02)',
                    padding: '32px',
                  }
            }
          >
            {/* Header */}
            <div className="mb-6">
              <h2
                className="font-bold mb-2"
                style={{ fontSize: 28, color: '#fffdeb', lineHeight: '1.1' }}
              >
                {edition.name}
              </h2>
              <p
                className="font-medium mb-3"
                style={{ fontSize: 28, color: '#fffdeb', letterSpacing: '-1.4px' }}
              >
                {edition.price}
              </p>
              <p
                className="leading-snug"
                style={{ fontSize: 15, color: '#fffdeb', opacity: 0.8 }}
              >
                {edition.desc}
              </p>
            </div>

            {/* Checklist */}
            <ul className="flex flex-col gap-2.5 mb-8 flex-1">
              {edition.items.map((item) => (
                <li key={item.label} className="flex items-center gap-2.5">
                  <span
                    className="font-mono text-xs flex-shrink-0"
                    style={{ color: '#22c55e' }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontSize: 16,
                      color: '#fffdeb',
                      opacity: item.active ? 1 : 0.45,
                    }}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className="w-full py-4 rounded-md font-semibold uppercase tracking-wide transition-opacity hover:opacity-90"
              style={
                edition.featured
                  ? {
                      background: '#ffab00',
                      color: '#3d013d',
                      fontSize: 16,
                      boxShadow: '2.1px 2.1px 0px 0px #bc0082, 0px 4px 24px 0px rgba(0,0,0,0.15)',
                    }
                  : {
                      background: 'rgba(109,1,109,0.1)',
                      color: '#fffdeb',
                      fontSize: 16,
                      border: '1px solid #bc0082',
                      boxShadow: '2px 2px 0px 0px #bc0082, 0px 4px 24px 0px rgba(0,0,0,0.15)',
                    }
              }
            >
              {edition.ctaLabel}
            </button>
          </div>
        ))}
      </div>

      <p className="text-xs mt-10 text-center" style={{ color: 'var(--text-muted)' }}>
        Prix indicatifs — éditions officielles non encore confirmées par Rockstar Games.
      </p>
    </div>
    </>
  )
}

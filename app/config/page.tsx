import { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import PageNextSteps from '@/components/ui/PageNextSteps'

export const metadata: Metadata = {
  title: 'Éditions GTA VI — Standard & Ultime',
}

const editions = [
  {
    name: 'GTA VI STANDARD',
    price: '79,99€',
    badge: null,
    note: 'Disponible en physique (code in-box) et numérique',
    desc: 'Le jeu complet avec bonus de précommande. Disponible chez tous les revendeurs.',
    featured: false,
    items: [
      { label: 'Jeu complet GTA VI', active: true },
      { label: 'GTA Online inclus', active: true },
      { label: 'Pack Vintage Vice City (bonus précommande)', active: true },
      { label: '1 mois GTA+ (numérique)', active: true },
      { label: 'Contenu exclusif Édition Ultime', active: false },
    ],
    ctaLabel: 'Précommander',
    ctaHref: '/acheter',
  },
  {
    name: 'GTA VI ULTIME',
    price: '99,99€',
    badge: 'RECOMMANDÉ',
    note: 'Numérique uniquement — PS5 & Xbox Series',
    desc: 'Le jeu complet + un large pack de contenu exclusif : véhicules, armes, commerces et quête bonus.',
    featured: true,
    items: [
      { label: 'Jeu complet GTA VI', active: true },
      { label: 'GTA Online inclus', active: true },
      { label: 'Pack Vintage Vice City (bonus précommande)', active: true },
      { label: '1 mois GTA+ (numérique)', active: true },
      { label: 'Voiture Grotti Cheetah 1995', active: true },
      { label: 'Revolvers Hawk & Little Morgan gravés', active: true },
      { label: 'Moto Dinka Enduro + Kayak Crest', active: true },
      { label: '4 commerces exclusifs (atelier, salon, boutique…)', active: true },
      { label: 'Quête exclusive collection de voitures', active: true },
    ],
    ctaLabel: 'Précommander',
    ctaHref: '/acheter',
  },
]

const bonusItems = [
  'Berline Vapid Stanier 1955',
  'Garage privé Shore Court (Ocean Beach)',
  'Costumes années 80 (lin & sequins)',
  'Skins d\'armes "Tommy Vercetti"',
  '1 mois d\'abonnement GTA+ (offre numérique)',
]

export default function ConfigPage() {
  return (
    <>
      <PageHero title="ÉDITIONS" label="Jeu" image="/images/gameplay3.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">

        {/* Editions */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch justify-center mb-12">
          {editions.map((edition) => (
            <div
              key={edition.name}
              className="flex-1 max-w-md flex flex-col rounded-[22px] overflow-hidden"
              style={
                edition.featured
                  ? { background: 'rgba(109,1,109,0.17)', border: '2.1px solid #f7cc7f', padding: '33px' }
                  : { background: 'rgba(109,1,109,0.06)', border: '1px solid rgba(255,253,235,0.1)', boxShadow: '0px 4px 20px 0px rgba(255,253,235,0.02)', padding: '32px' }
              }
            >
              {edition.badge && (
                <span className="text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full self-start mb-4" style={{ background: 'var(--accent-gold)', color: '#081E36' }}>
                  {edition.badge}
                </span>
              )}

              <div className="mb-6">
                <h2 className="font-bold mb-2" style={{ fontSize: 28, color: '#fffdeb', lineHeight: '1.1' }}>
                  {edition.name}
                </h2>
                <p className="font-medium mb-1" style={{ fontSize: 28, color: '#fffdeb', letterSpacing: '-1.4px' }}>
                  {edition.price}
                </p>
                <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {edition.note}
                </p>
                <p className="leading-snug" style={{ fontSize: 15, color: '#fffdeb', opacity: 0.8 }}>
                  {edition.desc}
                </p>
              </div>

              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {edition.items.map((item) => (
                  <li key={item.label} className="flex items-center gap-2.5">
                    <span className="font-mono text-xs flex-shrink-0" style={{ color: item.active ? '#22c55e' : 'rgba(255,255,255,0.2)' }}>
                      {item.active ? '✓' : '—'}
                    </span>
                    <span style={{ fontSize: 15, color: '#fffdeb', opacity: item.active ? 1 : 0.4 }}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={edition.ctaHref}
                className={`w-full py-4 rounded-md font-semibold uppercase tracking-wide text-center block transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 ${edition.featured ? 'hover:brightness-110 hover:shadow-[0_8px_32px_rgba(255,171,0,0.45)]' : 'hover:shadow-[0_8px_24px_rgba(188,0,130,0.35)]'}`}
                style={
                  edition.featured
                    ? { background: '#ffab00', color: '#3d013d', fontSize: 16, boxShadow: '2.1px 2.1px 0px 0px #bc0082, 0px 4px 24px 0px rgba(0,0,0,0.15)' }
                    : { background: 'rgba(109,1,109,0.1)', color: '#fffdeb', fontSize: 16, border: '1px solid #bc0082', boxShadow: '2px 2px 0px 0px #bc0082, 0px 4px 24px 0px rgba(0,0,0,0.15)' }
                }
              >
                {edition.ctaLabel}
              </Link>
            </div>
          ))}
        </div>

        {/* Bonus précommande */}
        <div className="rounded-2xl p-8 mb-10" style={{ background: 'rgba(240,192,64,0.06)', border: '1px solid rgba(240,192,64,0.2)' }}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 rounded-xl flex items-center justify-center" style={{ width: 44, height: 44, background: 'rgba(240,192,64,0.1)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-gold)' }}>
                <polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
              </svg>
            </div>
            <div>
              <p className="font-black text-white mb-2" style={{ fontFamily: 'var(--font-barlow)', fontSize: '1.05rem' }}>
                Pack Vintage Vice City — bonus précommande (toutes éditions)
              </p>
              <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                Inclus avec toute précommande avant le 20 novembre 2026 :
              </p>
              <ul className="grid sm:grid-cols-2 gap-1.5">
                {bonusItems.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-warm)' }}>
                    <span style={{ color: 'var(--accent-gold)' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-center mb-10" style={{ color: 'var(--text-muted)' }}>
          La version physique (boîte) contient un code de téléchargement — aucun disque inclus.
        </p>

        <PageNextSteps steps={[
          { href: '/acheter', label: 'Boutique', title: 'Où précommander', desc: 'Fnac, Amazon, Micromania, PS Store…', image: '/images/gameplay5.jpg' },
          { href: '/characters', label: 'Jeu', title: 'Les personnages', desc: 'Jason, Lucia et le cast complet', image: '/images/gameplay2.jpg' },
        ]} />
      </div>
    </>
  )
}

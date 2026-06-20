import Image from 'next/image'
import { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import SidebarLayout from '@/components/ui/SidebarLayout'
import PageNextSteps from '@/components/ui/PageNextSteps'

export const metadata: Metadata = {
  title: 'Grand Theft Info - Histoire & Personnages',
}

const sidebarSections = [
  {
    title: 'Jeu',
    items: [
      { label: 'Synopsis', anchor: 'synopsis' },
      { label: 'Protagonistes', anchor: 'protagonistes' },
      { label: 'Informations clés', anchor: 'infos' },
    ],
  },
]

const characters = [
  {
    name: 'Jason Duval',
    role: 'Protagoniste principal',
    desc: 'Ancien braqueur cherchant à rembourser ses dettes dans le comté de Leonida. Personnage principal jouable, plus posé et stratégique que ses prédécesseurs.',
    traits: ['Ancien criminel', 'Loyal', 'Calculateur'],
    img: '/images/hero-char.png',
    accent: 'var(--accent-gold)',
  },
  {
    name: 'Lucia Caminos',
    role: 'Co-protagoniste',
    desc: 'Petite amie de Jason, première femme protagoniste jouable de la franchise. Déterminée, impulsive, et au centre de la dynamique criminelle du jeu.',
    traits: ['Impulsive', 'Déterminée', '1ère femme jouable GTA'],
    img: '/images/char2.png',
    accent: 'var(--accent-magenta)',
  },
]

const facts = [
  { label: 'Lieu', value: 'Comté de Leonida, État fictif inspiré de la Floride' },
  { label: 'Ville principale', value: 'Vice City, plus grande et plus dense que GTA V' },
  { label: 'Époque', value: 'Années 2020 contemporaines' },
  { label: 'Modes de jeu', value: 'Histoire solo + GTA Online intégré' },
  { label: 'Inspiration', value: '"Natural Born Killers", "Bonnie & Clyde"' },
  { label: 'Développement', value: 'Rockstar North, 12 ans de développement' },
]

export default function GamePage() {
  return (
    <>
      <PageHero title="HISTOIRE & PERSONNAGES" label="Jeu" image="/images/gameplay2.jpg" />
      <SidebarLayout sections={sidebarSections}>

        {/* Synopsis */}
        <section id="synopsis" className="mb-12">
          <div
            className="grid lg:grid-cols-2 rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--border-gold)', minHeight: 340 }}
          >
            <div className="flex flex-col justify-center p-8 lg:p-10" style={{ background: 'var(--bg-card)' }}>
              <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--accent-gold)' }}>
                Synopsis
              </p>
              <h2 className="text-3xl font-black leading-tight text-white mb-5">
                Deux criminels.<br />Un seul comté.
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-warm)' }}>
                GTA 6 suit <strong className="text-white">Jason et Lucia</strong>, deux criminels en couple pris dans une spirale d'arnaques et de braquages à travers le comté de Leonida. Face à des dettes impayées, des ennemis puissants et un État corrompu, ils doivent naviguer entre loyauté, survie et ambition dans la version la plus grande et la plus vivante de Vice City jamais créée.
              </p>
            </div>
            <div className="relative min-h-[260px] lg:min-h-0" style={{ background: '#081E36' }}>
              <Image
                src="/images/hero-char.png"
                alt="Jason et Lucia, protagonistes de GTA 6"
                fill
                className="object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(270deg, transparent 50%, rgba(15,40,64,0.75) 100%)' }}
              />
            </div>
          </div>
        </section>

        {/* Characters */}
        <section id="protagonistes" className="mb-12">
          <h2 className="text-2xl font-black mb-6">Protagonistes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {characters.map((char) => (
              <div key={char.name} className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div className="relative h-64 overflow-hidden">
                  <Image src={char.img} alt={char.name} fill className="object-cover object-top" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(15,40,64,1) 0%, rgba(15,40,64,0.3) 60%, transparent 100%)' }} />
                  <div className="absolute bottom-4 left-5">
                    <p className="font-black text-2xl text-white">{char.name}</p>
                    <p className="text-sm font-semibold" style={{ color: char.accent }}>{char.role}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-warm)' }}>{char.desc}</p>
                  <div className="flex gap-2 flex-wrap">
                    {char.traits.map(trait => (
                      <span key={trait} className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}>
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key facts */}
        <section id="infos">
          <h2 className="text-2xl font-black mb-6">Informations clés</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {facts.map(fact => (
              <div key={fact.label} className="rounded-2xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>{fact.label}</p>
                <p className="font-semibold text-white">{fact.value}</p>
              </div>
            ))}
          </div>
        </section>

      </SidebarLayout>
    </>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import SidebarLayout from '@/components/ui/SidebarLayout'
import PageNextSteps from '@/components/ui/PageNextSteps'
import { roleLabelStyle } from '@/lib/characters'
import { getCharacters } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Grand Theft Info - Histoire & Personnages',
}

const sidebarSections = [
  {
    title: 'Jeu',
    items: [
      { label: 'Synopsis', anchor: 'synopsis' },
      { label: 'Personnages', anchor: 'personnages' },
      { label: 'Informations clés', anchor: 'infos' },
    ],
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

export default async function GamePage() {
  const characters = await getCharacters()

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
        <section id="personnages" className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black">Personnages</h2>
            <Link href="/characters" className="text-xs font-bold tracking-wider uppercase hover:opacity-70 transition-opacity" style={{ color: 'var(--accent-gold)' }}>
              Voir tout le cast →
            </Link>
          </div>

          {/* Protagonistes */}
          <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--accent-gold)' }}>Protagonistes jouables</p>
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {characters.filter(c => c.roleLabel === 'JOUABLE').map((char) => {
              const ls = roleLabelStyle[char.roleLabel]
              return (
                <Link
                  key={char.slug}
                  href={`/characters/${char.slug}`}
                  className="group rounded-2xl overflow-hidden block transition-transform hover:-translate-y-1"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image src={char.coverImage} alt={char.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(15,40,64,1) 0%, rgba(15,40,64,0.3) 60%, transparent 100%)' }} />
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                      <div>
                        <span className="inline-block text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full mb-1" style={{ background: ls.bg, color: ls.color, border: `1px solid ${ls.border}` }}>{char.roleLabel}</span>
                        <p className="font-black text-xl text-white">{char.name}</p>
                        <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>{char.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-warm)' }}>{char.lead}</p>
                    <div className="flex gap-2 flex-wrap">
                      {char.traits.slice(0, 3).map(trait => (
                        <span key={trait} className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}>{trait}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Cast secondaire aperçu */}
          <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>Cast secondaire</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
            {characters.filter(c => c.roleLabel !== 'JOUABLE').map((char) => {
              const ls = roleLabelStyle[char.roleLabel]
              return (
                <Link
                  key={char.slug}
                  href={`/characters/${char.slug}`}
                  className="group rounded-xl p-4 flex items-center gap-3 transition-all hover:-translate-y-0.5"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[8px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded-full mb-1" style={{ background: ls.bg, color: ls.color, border: `1px solid ${ls.border}` }}>{char.roleLabel}</span>
                    <p className="text-sm font-black text-white truncate">{char.name}</p>
                    <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{char.role}</p>
                  </div>
                  <svg className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--accent-gold)' }}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              )
            })}
          </div>

          <Link href="/characters" className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:opacity-80" style={{ background: 'rgba(240,192,64,0.1)', color: 'var(--accent-gold)', border: '1px solid rgba(240,192,64,0.25)' }}>
            Fiches complètes de tous les personnages →
          </Link>
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

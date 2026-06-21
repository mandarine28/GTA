import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { characters, roleLabelStyle } from '@/lib/characters'
import PageHero from '@/components/ui/PageHero'
import PageNextSteps from '@/components/ui/PageNextSteps'

export const metadata: Metadata = {
  title: 'Personnages GTA VI - Grand Theft Info',
  description: 'Protagonistes jouables, alliés et antagonistes de GTA VI. Fiches complètes : Jason Duval, Lucia Caminos, Brian Heder, et tout le cast confirmé.',
}

export default function CharactersPage() {
  return (
    <>
      <PageHero title="PERSONNAGES" label="GTA VI" image="/images/gameplay1.jpg" />

      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">

        <p className="text-sm mb-10 max-w-2xl" style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
          GTA VI introduit pour la première fois un duo de protagonistes jouables : Jason Duval et Lucia Caminos. Autour d'eux gravitent alliés, patrons criminels, agents fédéraux et figures de la pègre de Leonida — un cast dense au cœur d'un récit criminel dans l'État de Leonida.
        </p>

        {/* Protagonistes jouables */}
        <h2 className="text-xs font-black tracking-[0.25em] uppercase mb-5" style={{ color: 'var(--accent-gold)' }}>
          Protagonistes jouables
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {characters.filter(c => c.roleLabel === 'JOUABLE').map((char) => (
            <Link
              key={char.slug}
              href={`/characters/${char.slug}`}
              className="group relative rounded-3xl overflow-hidden block transition-transform hover:-translate-y-1"
              style={{ minHeight: 480 }}
            >
              <Image
                src={char.coverImage}
                alt={char.name}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(0deg, rgba(6,15,28,1) 0%, rgba(6,15,28,0.5) 50%, transparent 100%)' }}
              />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <span
                  className="inline-block text-[10px] font-black tracking-[0.25em] uppercase px-3 py-1.5 rounded-full mb-3"
                  style={{ background: roleLabelStyle[char.roleLabel]?.bg, color: roleLabelStyle[char.roleLabel]?.color, border: `1px solid ${roleLabelStyle[char.roleLabel]?.border}` }}
                >
                  {char.roleLabel}
                </span>
                <h3 className="text-4xl font-black text-white uppercase leading-none mb-2">
                  {char.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {char.role}
                </p>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '38ch' }}>
                  {char.lead}
                </p>
                <div className="flex flex-wrap gap-2">
                  {char.traits.slice(0, 3).map((trait) => (
                    <span
                      key={trait}
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                style={{ background: roleLabelStyle[char.roleLabel]?.color }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#081E36" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Cast secondaire */}
        <h2 className="text-xs font-black tracking-[0.25em] uppercase mb-5" style={{ color: 'var(--text-muted)' }}>
          Cast secondaire
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {characters.filter(c => c.roleLabel !== 'JOUABLE').map((char) => (
            <Link
              key={char.slug}
              href={`/characters/${char.slug}`}
              className="group relative rounded-2xl overflow-hidden block transition-transform hover:-translate-y-1"
              style={{ minHeight: 280 }}
            >
              <Image
                src={char.coverImage}
                alt={char.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(0deg, rgba(6,15,28,0.98) 0%, rgba(6,15,28,0.6) 55%, rgba(6,15,28,0.2) 100%)' }}
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span
                  className="inline-block text-[9px] font-black tracking-[0.2em] uppercase px-2.5 py-1 rounded-full mb-2"
                  style={{ background: roleLabelStyle[char.roleLabel]?.bg, color: roleLabelStyle[char.roleLabel]?.color, border: `1px solid ${roleLabelStyle[char.roleLabel]?.border}` }}
                >
                  {char.roleLabel}
                </span>
                <h3 className="text-xl font-black text-white uppercase leading-none mb-1">
                  {char.name}
                </h3>
                <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {char.role}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {char.traits.slice(0, 2).map((trait) => (
                    <span
                      key={trait}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <PageNextSteps steps={[
          { href: '/game', label: 'Jeu', title: 'Histoire & Univers', desc: 'Leonida, Vice City et le scénario principal', image: '/images/gameplay2.jpg' },
          { href: '/media/trailers', label: 'Médias', title: 'Trailers officiels', desc: 'Toutes les vidéos Rockstar Games', image: '/images/gameplay3.jpg' },
          { href: '/news', label: 'Actualités', title: 'Dernières news', desc: 'Leaks, confirmations et mises à jour', image: '/images/gameplay4.jpg' },
        ]} />
      </div>
    </>
  )
}

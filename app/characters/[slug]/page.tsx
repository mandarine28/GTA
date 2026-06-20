import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { characters } from '@/lib/characters'
import PageNextSteps from '@/components/ui/PageNextSteps'

export function generateStaticParams() {
  return characters.map(c => ({ slug: c.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const char = characters.find(c => c.slug === slug)
  if (!char) return {}
  return {
    title: `${char.name} - Personnage GTA VI - Grand Theft Info`,
    description: char.lead,
  }
}

export default async function CharacterPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const char = characters.find(c => c.slug === slug)
  if (!char) notFound()

  return (
    <div>
      {/* HERO pleine largeur */}
      <div className="relative w-full overflow-hidden" style={{ height: 520 }}>
        <Image
          src={char.coverImage}
          alt={char.name}
          fill
          className="object-cover object-top"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(6,15,28,0.97) 0%, rgba(6,15,28,0.65) 55%, rgba(6,15,28,0.2) 100%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(0deg, rgba(6,15,28,1) 0%, transparent 35%)' }}
        />

        <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-4 pb-10">
          <Link
            href="/characters"
            className="inline-flex items-center gap-2 text-xs font-semibold mb-6 transition-opacity hover:opacity-70"
            style={{ color: 'var(--text-muted)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Personnages
          </Link>

          <div className="flex items-end gap-5">
            <div>
              <span
                className="inline-block text-[10px] font-black tracking-[0.25em] uppercase px-3 py-1.5 rounded-full mb-3"
                style={{ background: char.accentColor, color: '#081E36' }}
              >
                {char.roleLabel}
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white uppercase leading-none">
                {char.name}
              </h1>
              <p className="text-base mt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {char.role}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENU */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-10">

          {/* SIDEBAR */}
          <aside>
            {/* Fiche rapide */}
            <div className="rounded-2xl p-5 mb-5 sticky top-24" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-black tracking-[0.2em] uppercase mb-4" style={{ color: char.accentColor }}>
                Fiche personnage
              </p>

              {[
                { key: 'Genre', val: char.gender },
                { key: 'Âge', val: char.age },
                { key: 'Origine', val: char.origin },
              ].map(row => (
                <div key={row.key} className="py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--text-muted)' }}>{row.key}</p>
                  <p className="text-sm font-semibold text-white">{row.val}</p>
                </div>
              ))}

              <div className="pt-4">
                <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>Traits</p>
                <div className="flex flex-wrap gap-2">
                  {char.traits.map(trait => (
                    <span
                      key={trait}
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${char.accentColor}18`, color: char.accentColor, border: `1px solid ${char.accentColor}30` }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <div>
            {/* Lead */}
            <p className="text-lg font-semibold leading-relaxed mb-10" style={{ color: 'var(--text-warm)', borderLeft: `3px solid ${char.accentColor}`, paddingLeft: '1.25rem' }}>
              {char.lead}
            </p>

            {/* Histoire */}
            <section className="mb-10">
              <h2 className="text-2xl font-black uppercase mb-6" style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
                Histoire
              </h2>
              <div className="space-y-5">
                {char.histoire.map((para, i) => (
                  <p key={i} className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                    {para}
                  </p>
                ))}
              </div>
            </section>

            {/* Personnalité */}
            <section className="mb-10">
              <h2 className="text-2xl font-black uppercase mb-5" style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
                Personnalité
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                {char.personnalite}
              </p>
            </section>

            {/* Citations */}
            <section className="mb-10">
              <h2 className="text-2xl font-black uppercase mb-5" style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
                Citations
              </h2>
              <div className="space-y-4">
                {char.citations.map((quote, i) => (
                  <blockquote
                    key={i}
                    className="px-6 py-4 rounded-2xl text-base italic font-medium"
                    style={{ background: `${char.accentColor}10`, borderLeft: `3px solid ${char.accentColor}`, color: 'rgba(255,255,255,0.85)' }}
                  >
                    {quote}
                  </blockquote>
                ))}
              </div>
            </section>

            {/* Galerie */}
            <section className="mb-10">
              <h2 className="text-2xl font-black uppercase mb-5" style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
                Galerie
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {char.mediaImages.map((img, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '16/10' }}>
                    <Image src={img} alt={`${char.name} - image ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <PageNextSteps steps={[
          { href: '/characters', label: 'Personnages', title: 'Tous les personnages', desc: 'Jason, Lucia et le cast complet', image: '/images/gameplay1.jpg' },
          { href: '/game', label: 'Jeu', title: 'Histoire & Univers', desc: 'Vice City, Leonida et le scénario', image: '/images/gameplay2.jpg' },
          { href: '/media/trailers', label: 'Médias', title: 'Trailers GTA VI', desc: 'Bande-annonces officielles', image: '/images/gameplay3.jpg' },
        ]} />
      </div>
    </div>
  )
}

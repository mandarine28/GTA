import Image from 'next/image'

interface PageHeroProps {
  title: string
  label?: string
  image?: string
}

export default function PageHero({
  title,
  label,
  image = '/images/gameplay1.jpg',
}: PageHeroProps) {
  return (
    <div className="relative">
      <div className="relative w-full overflow-hidden" style={{ height: 240 }}>
        <Image
          src={image}
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden="true"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(8,20,40,0.88) 0%, rgba(8,20,40,0.4) 60%, transparent 100%)',
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="relative z-10 inline-block px-8 py-5"
          style={{
            background: 'var(--bg-card)',
            borderBottom: '3px solid var(--accent-gold)',
            marginTop: -48,
          }}
        >
          {label && (
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-1"
              style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-urbanist)' }}
            >
              {label}
            </p>
          )}
          <h1
            className="text-4xl md:text-5xl font-black uppercase leading-none"
            style={{ color: '#fff' }}
          >
            {title}
          </h1>
        </div>
      </div>
    </div>
  )
}

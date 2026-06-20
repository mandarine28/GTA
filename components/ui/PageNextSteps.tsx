import Link from 'next/link'
import Image from 'next/image'

interface NextStep {
  href: string
  label: string
  title: string
  desc: string
  image: string
}

interface PageNextStepsProps {
  steps: NextStep[]
}

export default function PageNextSteps({ steps }: PageNextStepsProps) {
  const cols = steps.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'

  return (
    <section className={`mt-16 pt-10`} style={{ borderTop: '1px solid var(--border)' }}>
      <p
        className="text-xs font-bold tracking-[0.25em] uppercase mb-6"
        style={{ color: 'var(--accent-gold)' }}
      >
        Continuer à explorer
      </p>
      <div className={`grid gap-4 ${cols}`}>
        {steps.map((step) => (
          <Link
            key={step.href}
            href={step.href}
            className="group relative rounded-2xl overflow-hidden block transition-transform hover:-translate-y-1"
            style={{ height: 176 }}
          >
            <Image
              src={step.image}
              alt=""
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(0deg, rgba(8,20,40,0.96) 0%, rgba(8,20,40,0.45) 55%, transparent 100%)',
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: 'var(--accent-gold)' }}
              >
                {step.label}
              </p>
              <p className="font-black text-white text-sm uppercase leading-tight mb-1">
                {step.title}
              </p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {step.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

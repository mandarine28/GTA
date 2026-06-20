import type { Metadata } from 'next'
import { mockArticles } from '@/lib/mock-data'
import NewsGrid from './NewsGrid'
import PageHero from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Actualités - Grand Theft Info',
  description: "Toutes les news GTA 6 : patches, mises à jour, easter eggs et actualités en temps réel.",
}

export default function NewsPage() {
  return (
    <>
      <PageHero title="ACTUALITÉS VICE CITY" label="Latest Updates" image="/images/gameplay1.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
        <NewsGrid articles={mockArticles} />
      </div>
    </>
  )
}

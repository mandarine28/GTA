import type { Metadata } from 'next'
import { getArticles } from '@/lib/db'
import NewsGrid from './NewsGrid'
import PageHero from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'ActualitÃ©s - GTA6Zone',
  description: "Toutes les news GTA 6 : patches, mises Ã  jour, easter eggs et actualitÃ©s en temps rÃ©el.",
}

export default async function NewsPage() {
  const articles = await getArticles()
  return (
    <>
      <PageHero title="ACTUALITÃ‰S VICE CITY" label="Latest Updates" image="/images/gameplay1.jpg" />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16">
        <NewsGrid articles={articles} />
      </div>
    </>
  )
}

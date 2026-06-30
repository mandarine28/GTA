import { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import WeeklyClient from './WeeklyClient'

export const metadata: Metadata = {
  title: 'MÃ j Hebdomadaire GTA 6 - GTA6Zone',
  description: 'Les bonus actifs, Ã©vÃ©nements, nouveaux vÃ©hicules et promotions de la semaine dans GTA Online.',
}

export default function WeeklyPage() {
  return (
    <>
      <PageHero title="BONUS & Ã‰VÃ‰NEMENTS DE LA SEMAINE" label="ActualitÃ©s" image="/images/gameplay2.jpg" />
      <WeeklyClient />
    </>
  )
}

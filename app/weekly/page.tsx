import { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import WeeklyClient from './WeeklyClient'

export const metadata: Metadata = {
  title: 'Màj Hebdomadaire GTA 6 - Grand Theft Info',
  description: 'Les bonus actifs, événements, nouveaux véhicules et promotions de la semaine dans GTA Online.',
}

export default function WeeklyPage() {
  return (
    <>
      <PageHero title="MÀJ HEBDOMADAIRE" label="Actualités" image="/images/gameplay2.jpg" />
      <WeeklyClient />
    </>
  )
}

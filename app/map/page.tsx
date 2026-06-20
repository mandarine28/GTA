import { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import MapClient from './MapClient'

export const metadata: Metadata = {
  title: 'Carte de Vice City - Grand Theft Info',
  description: 'Explorez les 6 districts du comté de Leonida : Vice City Downtown, Neon Coast, Port Gellhorn et plus encore. Infos et leaks par zone.',
}

export default function MapPage() {
  return (
    <>
      <PageHero title="CARTE DE VICE CITY" label="Jeu" image="/images/gameplay3.jpg" />
      <MapClient />
    </>
  )
}

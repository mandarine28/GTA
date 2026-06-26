import { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import MapClient from './MapClient'

export const metadata: Metadata = {
  title: 'Régions de Leonida - Grand Theft Info',
  description: 'Explorez les 6 régions confirmées de GTA VI : Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia, Mont Kalaga.',
}

export default function MapPage() {
  return (
    <>
      <PageHero title="RÉGIONS DE LEONIDA" label="Jeu" image="/images/regions/vice-city/montage.jpg" />
      <MapClient />
    </>
  )
}

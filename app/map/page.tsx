import { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import MapClient from './MapClient'

export const metadata: Metadata = {
  title: 'RÃ©gions de Leonida - GTA6Zone',
  description: 'Explorez les 6 rÃ©gions confirmÃ©es de GTA VI : Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia, Mont Kalaga.',
}

export default function MapPage() {
  return (
    <>
      <PageHero title="RÃ‰GIONS DE LEONIDA" label="Jeu" image="/images/regions/vice-city/montage.jpg" />
      <MapClient />
    </>
  )
}

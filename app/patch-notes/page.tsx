import { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import PatchNotesClient from './PatchNotesClient'

export const metadata: Metadata = {
  title: 'Patch Notes GTA 6 - Historique des mises à jour',
  description: 'Tous les patch notes GTA 6 : nouveautés, corrections, équilibrages par version.',
}

export default function PatchNotesPage() {
  return (
    <>
      <PageHero title="PATCH NOTES" label="Mises à jour" image="/images/gameplay5.jpg" />
      <PatchNotesClient />
    </>
  )
}

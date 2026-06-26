import { createClient } from '@sanity/client'
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})
await sanity.patch('character-brian-heder').set({ role: 'Trafiquant & employeur de Jason', roleLabel: 'ALLIÉ' }).commit()
console.log('✓ brian-heder → ALLIÉ')
await sanity.patch('character-jason-duval').set({ coverImage: '/images/characters/jason-duval.png' }).commit()
console.log('✓ jason-duval → coverImage portrait')
await sanity.patch('character-lucia-caminos').set({ coverImage: '/images/characters/lucia-caminos.png' }).commit()
console.log('✓ lucia-caminos → coverImage portrait')
console.log('Done.')

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'
import { env } from './sanity/env'

export default defineConfig({
  name: 'gta6-hub',
  title: 'GTA 6 Hub',
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            S.listItem().title('Articles').schemaType('article').child(S.documentTypeList('article')),
            S.listItem().title('Personnages').schemaType('character').child(S.documentTypeList('character')),
            S.listItem().title('Véhicules').schemaType('vehicle').child(S.documentTypeList('vehicle')),
            S.listItem().title('Armes').schemaType('weapon').child(S.documentTypeList('weapon')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})

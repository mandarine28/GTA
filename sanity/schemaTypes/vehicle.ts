import { defineField, defineType } from 'sanity'

export const vehicleType = defineType({
  name: 'vehicle',
  title: 'Véhicule',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name' },
      validation: r => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Supercar', value: 'supercar' },
          { title: 'Muscle', value: 'muscle' },
          { title: 'Moto', value: 'motorcycle' },
          { title: 'Camion', value: 'truck' },
          { title: 'SUV', value: 'suv' },
          { title: 'Van', value: 'van' },
          { title: 'Bateau', value: 'boat' },
          { title: 'Aéronef', value: 'aircraft' },
        ],
      },
    }),
    defineField({ name: 'manufacturer', title: 'Constructeur', type: 'string' }),
    defineField({ name: 'price_story', title: 'Prix (histoire)', type: 'number' }),
    defineField({ name: 'price_online', title: 'Prix (online)', type: 'number' }),
    defineField({ name: 'top_speed', title: 'Vitesse max', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'image_url',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'object',
      fields: [
        defineField({ name: 'speed', title: 'Vitesse (0–100)', type: 'number' }),
        defineField({ name: 'acceleration', title: 'Accélération (0–100)', type: 'number' }),
        defineField({ name: 'handling', title: 'Maniabilité (0–100)', type: 'number' }),
        defineField({ name: 'braking', title: 'Freinage (0–100)', type: 'number' }),
        defineField({ name: 'traction', title: 'Traction (0–100)', type: 'number' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'image_url' },
  },
})

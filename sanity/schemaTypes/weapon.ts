import { defineField, defineType } from 'sanity'

export const weaponType = defineType({
  name: 'weapon',
  title: 'Arme',
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
          { title: 'Pistolet', value: 'pistol' },
          { title: 'Mitraillette', value: 'smg' },
          { title: 'Fusil', value: 'rifle' },
          { title: 'Fusil à pompe', value: 'shotgun' },
          { title: 'Sniper', value: 'sniper' },
          { title: 'Corps à corps', value: 'melee' },
          { title: 'Lourd', value: 'heavy' },
          { title: 'Grenade / Jet', value: 'throwable' },
        ],
      },
    }),
    defineField({ name: 'price', title: 'Prix', type: 'number' }),
    defineField({ name: 'ammo_capacity', title: 'Capacité munitions', type: 'number' }),
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
        defineField({ name: 'damage', title: 'Dégâts (0–100)', type: 'number' }),
        defineField({ name: 'fire_rate', title: 'Cadence de tir (0–100)', type: 'number' }),
        defineField({ name: 'accuracy', title: 'Précision (0–100)', type: 'number' }),
        defineField({ name: 'range', title: 'Portée (0–100)', type: 'number' }),
        defineField({ name: 'reload_speed', title: 'Rechargement (0–100)', type: 'number' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'image_url' },
  },
})

import { defineField, defineType } from 'sanity'

export const characterType = defineType({
  name: 'character',
  title: 'Personnage',
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
      name: 'roleLabel',
      title: 'Rôle',
      type: 'string',
      options: {
        list: [
          { title: 'Jouable', value: 'JOUABLE' },
          { title: 'Antagoniste', value: 'ANTAGONISTE' },
          { title: 'Allié', value: 'ALLIÉ' },
        ],
        layout: 'radio',
      },
      validation: r => r.required(),
    }),
    defineField({
      name: 'role',
      title: 'Description du rôle',
      type: 'string',
      description: 'Ex: "Protagoniste principal", "Shérif du comté"',
    }),
    defineField({
      name: 'accentColor',
      title: 'Couleur accent (hex)',
      type: 'string',
      description: 'Ex: #F0C040',
    }),
    defineField({
      name: 'coverImage',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gender',
      title: 'Genre',
      type: 'string',
    }),
    defineField({
      name: 'age',
      title: 'Âge',
      type: 'string',
    }),
    defineField({
      name: 'origin',
      title: 'Origine',
      type: 'string',
    }),
    defineField({
      name: 'lead',
      title: 'Lead (résumé court)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'histoire',
      title: 'Histoire (paragraphes)',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'personnalite',
      title: 'Personnalité',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'traits',
      title: 'Traits de caractère',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'citations',
      title: 'Citations',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'mediaImages',
      title: 'Galerie',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Les protagonistes en premier (1, 2), cast secondaire ensuite',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'roleLabel',
      media: 'coverImage',
    },
  },
})

import { defineField, defineType } from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'News', value: 'news' },
          { title: 'Patch notes', value: 'patch' },
          { title: 'Weekly update', value: 'weekly_update' },
          { title: 'Easter egg', value: 'easter_egg' },
        ],
      },
    }),
    defineField({
      name: 'summary',
      title: 'Résumé',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'text',
      rows: 10,
    }),
    defineField({
      name: 'cover_image',
      title: 'Image de couverture (URL)',
      type: 'url',
    }),
    defineField({
      name: 'source_url',
      title: 'URL source',
      type: 'url',
    }),
    defineField({
      name: 'source_name',
      title: 'Nom de la source',
      type: 'string',
    }),
    defineField({
      name: 'published_at',
      title: 'Date de publication',
      type: 'datetime',
    }),
  ],
  orderings: [
    {
      title: 'Date (plus récent)',
      name: 'publishedAtDesc',
      by: [{ field: 'published_at', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' },
  },
})

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'editorial',
  title: "Pastor's Editorial",
  type: 'document',
  description: "Articles from the pastor's desk",
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'author',
      type: 'string',
      title: 'Author',
      description: 'e.g., Rev. Dr. James Smith',
    }),
    defineField({
      name: 'publishedDate',
      type: 'date',
      title: 'Published Date',
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      description: 'Short summary shown in listings',
      rows: 2,
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body Content',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Featured Image',
      options: { hotspot: true },
    }),
  ],
  orderings: [
    { title: 'Published Date', name: 'dateDesc', by: [{ field: 'publishedDate', direction: 'desc' }] },
  ],
})
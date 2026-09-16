import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sermon',
  title: 'Sermon',
  type: 'document',
  description: 'Recorded sermons with audio/video',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'speaker',
      type: 'string',
      title: 'Speaker',
      description: 'Who preached this sermon',
    }),
    defineField({
      name: 'passage',
      type: 'string',
      title: 'Scripture Passage',
      description: 'e.g., John 3:16',
    }),
    defineField({
      name: 'date',
      type: 'date',
      title: 'Date Preached',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
    }),
    defineField({
      name: 'series',
      type: 'reference',
      title: 'Series',
      to: [{ type: 'sermonSeries' }],
    }),
    defineField({
      name: 'audioFile',
      type: 'file',
      title: 'Audio File',
      description: 'Upload sermon audio (MP3, etc.)',
      options: { accept: 'audio/*' },
    }),
    defineField({
      name: 'videoUrl',
      type: 'url',
      title: 'Video URL',
      description: 'YouTube or Vimeo embed URL for livestream/recording',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display Order',
    }),
  ],
  orderings: [
    { title: 'Date preached', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
})
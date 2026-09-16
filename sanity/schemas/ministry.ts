import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ministry',
  title: 'Ministry',
  type: 'document',
  description: 'Church ministries and their details',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Ministry Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Purpose of this ministry',
      rows: 3,
    }),
    defineField({
      name: 'meetingTime',
      type: 'string',
      title: 'Meeting Time',
      description: 'e.g., Sundays 9:30 AM, 2nd Saturday 10:00 AM',
    }),
    defineField({
      name: 'howToJoin',
      type: 'string',
      title: 'How to Join',
      description: 'e.g., Sign up at the welcome center',
    }),
    defineField({
      name: 'leader',
      type: 'reference',
      title: 'Leader',
      to: [{ type: 'leader' }],
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
    { title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'leader',
  title: 'Leader',
  type: 'document',
  description: 'Church leadership team members',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role',
      description: 'e.g., Senior Pastor, Associate Pastor, Board Member',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'e.g., Rev. Dr., Pastor, Deacon',
    }),
    defineField({
      name: 'bio',
      type: 'text',
      title: 'Bio',
      rows: 5,
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Photo',
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
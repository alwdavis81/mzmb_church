import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'prayerRequest',
  title: 'Prayer Request',
  type: 'document',
  description: 'Prayer requests submitted via the prayer form',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name', description: 'Optional — blank if anonymous' }),
    defineField({ name: 'prayerRequest', type: 'text', title: 'Prayer Request', rows: 5 }),
    defineField({ name: 'anonymous', type: 'boolean', title: 'Anonymous', initialValue: false }),
    defineField({ name: 'submittedAt', type: 'datetime', title: 'Submitted At' }),
  ],
  orderings: [{ title: 'Date', name: 'dateDesc', by: [{ field: 'submittedAt', direction: 'desc' }] }],
})
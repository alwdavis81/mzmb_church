import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  description: 'Messages submitted via the contact form',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name' }),
    defineField({ name: 'email', type: 'string', title: 'Email' }),
    defineField({ name: 'subject', type: 'string', title: 'Subject' }),
    defineField({ name: 'message', type: 'text', title: 'Message', rows: 5 }),
    defineField({ name: 'submittedAt', type: 'datetime', title: 'Submitted At' }),
  ],
  orderings: [{ title: 'Date', name: 'dateDesc', by: [{ field: 'submittedAt', direction: 'desc' }] }],
})
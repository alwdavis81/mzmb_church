import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'visitorPage',
  title: 'Visitor Page',
  type: 'document',
  description: 'Singleton — content for the Plan a Visit page',
  fields: [
    defineField({
      name: 'pageTitle',
      type: 'string',
      title: 'Page Title',
      initialValue: 'Plan a Visit',
    }),
    defineField({
      name: 'introText',
      type: 'text',
      title: 'Intro Text',
      description: 'Header message for visitors',
      rows: 2,
    }),
    defineField({
      name: 'whatToExpect',
      type: 'text',
      title: 'What to Expect',
      rows: 4,
    }),
    defineField({
      name: 'sundaySchedule',
      type: 'array',
      title: 'Sunday Schedule',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'scheduleItem',
          fields: [
            { type: 'string', name: 'time', title: 'Time' },
            { type: 'string', name: 'label', title: 'Activity' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'parkingInfo',
      type: 'text',
      title: 'Parking & Accessibility',
      rows: 3,
    }),
    defineField({
      name: 'kidsInfo',
      type: 'text',
      title: 'Kids Check-In Info',
      rows: 3,
    }),
    defineField({
      name: 'dressStyle',
      type: 'text',
      title: 'Dress Style Info',
      rows: 2,
    }),
    defineField({
      name: 'faqItems',
      type: 'array',
      title: 'FAQ Items',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faq',
          fields: [
            { type: 'string', name: 'question', title: 'Question' },
            { type: 'text', name: 'answer', title: 'Answer', rows: 3 },
          ],
        }),
      ],
    }),
  ],
})
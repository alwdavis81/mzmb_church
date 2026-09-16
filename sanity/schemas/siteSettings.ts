import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  description: 'Singleton — global site configuration',
  fields: [
    defineField({
      name: 'emergencyBanner',
      title: 'Emergency Banner',
      type: 'object',
      fields: [
        { type: 'boolean', name: 'active', title: 'Active', initialValue: false },
        { type: 'string', name: 'text', title: 'Banner Text' },
        { type: 'string', name: 'linkUrl', title: 'Link URL', description: 'Optional link' },
        { type: 'string', name: 'linkLabel', title: 'Link Label', description: 'e.g., Learn More' },
        { type: 'boolean', name: 'dismissible', title: 'Dismissible', initialValue: true },
        { type: 'string', name: 'bgColor', title: 'Background Color', initialValue: '#DC2626' },
      ],
    }),
    defineField({
      name: 'churchInfo',
      title: 'Church Information',
      type: 'object',
      fields: [
        { type: 'string', name: 'name', title: 'Church Name' },
        { type: 'string', name: 'address', title: 'Address' },
        { type: 'string', name: 'cityStateZip', title: 'City, State ZIP' },
        { type: 'string', name: 'phone', title: 'Phone' },
        { type: 'string', name: 'email', title: 'Email' },
      ],
    }),
    defineField({
      name: 'serviceTimes',
      title: 'Service Times',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'serviceTime',
          fields: [
            { type: 'string', name: 'label', title: 'Label', description: 'e.g., Sunday Worship' },
            { type: 'string', name: 'time', title: 'Time', description: 'e.g., 11:00 AM' },
            { type: 'string', name: 'day', title: 'Day', description: 'e.g., Sunday, Wednesday' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            { type: 'string', name: 'platform', title: 'Platform', description: 'e.g., Facebook, YouTube' },
            { type: 'url', name: 'url', title: 'URL' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'livestreamUrl',
      title: 'Livestream URL',
      type: 'url',
      description: 'YouTube/embed URL for live service streaming',
    }),
  ],
})
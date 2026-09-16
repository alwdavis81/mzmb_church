export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  description: 'Upcoming church events',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      required: true,
    },
    {
      name: 'date',
      type: 'string',
      title: 'Date',
      description: 'Event date',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      description: 'e.g., Worship, Community, Special',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      description: 'Event image',
      options: {
        hotspot: true,
      },
    },
  ],
};

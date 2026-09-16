export default {
  name: 'history',
  title: 'History',
  type: 'document',
  description: 'Church history and milestones',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      required: true,
    },
    {
      name: 'year',
      type: 'string',
      title: 'Year',
      description: 'Year of the event',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 4,
    },
    {
      name: 'significance',
      type: 'string',
      title: 'Significance',
      description: 'Why this event matters',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      description: 'Historical image',
      options: {
        hotspot: true,
      },
    },
  ],
};

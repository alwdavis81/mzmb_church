export default {
  name: 'giving',
  title: 'Giving',
  type: 'document',
  description: 'Giving and donation information',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      required: true,
    },
    {
      name: 'type',
      type: 'string',
      title: 'Type',
      description: 'e.g., Online, In-Person, Text-to-Give',
    },
    {
      name: 'details',
      type: 'text',
      title: 'Details',
      rows: 3,
    },
    {
      name: 'benefit',
      type: 'string',
      title: 'Benefit',
      description: 'How giving supports the church',
    },
  ],
};

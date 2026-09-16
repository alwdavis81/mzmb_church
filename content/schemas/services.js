export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  description: 'Weekly service schedules',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      required: true,
    },
    {
      name: 'time',
      type: 'string',
      title: 'Time',
      description: 'Service time (e.g., "9:30 AM")',
      required: true,
    },
    {
      name: 'day',
      type: 'string',
      title: 'Day',
      description: 'Day of the week (e.g., "Sunday")',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 2,
    },
  ],
};

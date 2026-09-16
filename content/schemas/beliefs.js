export default {
  name: 'belief',
  title: 'Belief',
  type: 'document',
  description: 'Statement of Faith articles',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      required: true,
    },
    {
      name: 'background',
      type: 'text',
      title: 'Explanation',
      description: 'Detailed explanation of the belief',
      rows: 4,
    },
    {
      name: 'theTrinity',
      type: 'string',
      title: 'The Trinity',
      description: 'Father, Son, Holy Spirit',
    },
    {
      name: 'theBible',
      type: 'string',
      title: 'The Bible',
      description: 'Inspiration, authority, and inerrancy of Scripture',
    },
    {
      name: 'salvation',
      type: 'string',
      title: 'Salvation',
      description: 'Salvation by grace through faith',
    },
    {
      name: 'theChurch',
      type: 'string',
      title: 'The Church',
      description: 'Purpose, mission, and community',
    },
    {
      name: 'futureHope',
      type: 'string',
      title: 'Future Hope',
      description: 'Return of Christ, resurrection, eternal life',
    },
    {
      name: 'prayerWorship',
      type: 'string',
      title: 'Prayer & Worship',
      description: 'Role of prayer and worship in our lives',
    },
  ],
};
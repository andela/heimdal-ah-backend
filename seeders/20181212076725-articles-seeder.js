/* eslint-disable no-unused-vars */
import chance from 'chance';
import slugify from 'slugify';

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('articles', [{
    slug: 'this-is-a-post-title-l78hgybf',
    title: 'This is a post title',
    description: 'Descriptive title',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    `,
    userId: 1,
    isArchived: false,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'this-is-the-second-post-title-mbjb7y',
    title: 'This is the second post title',
    description: 'Second descriptive title',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    `,
    userId: 2,
    isArchived: false,
    isPublished: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'this-is-third-post-title-u87ddsa',
    title: 'This is the third post title',
    description: 'Third descriptive title',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    `,
    userId: 3,
    isArchived: false,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'this-is-third-pot-title-u87dda',
    title: 'This is the third post title',
    description: 'Third descriptive title',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    `,
    userId: 4,
    isArchived: false,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'this-is-trd-post-title-u87ddsa',
    title: 'This is the thir post title',
    description: 'Third descriptive title',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    `,
    userId: 5,
    isArchived: false,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'what-a-wonderful-world-u87dda',
    title: 'What a wonderful world title',
    description: 'This describes a world that is wonderful',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    `,
    userId: 1,
    isArchived: true,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'what-a-wonderful-day-u87dsss',
    title: 'what a wonderful day',
    description: 'Third descriptive title',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    `,
    userId: 2,
    isArchived: false,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'what-a-wonderful-world-ahead-u87cdaa',
    title: 'What a wonderful world title ahead',
    description: 'This describes a world that is wonderful',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    `,
    userId: 1,
    isArchived: true,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'what-a-wonderful-world-ahead-of-time-u87ddae',
    title: 'What a beautiful',
    description: 'This describes a world that is wonderful',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    `,
    userId: 1,
    isArchived: true,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'what-a-wonderful-day-fort-love-u87dsyths',
    title: 'what a wonderful day',
    description: 'Third descriptive title',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    `,
    userId: 2,
    isArchived: false,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'what-a-true-wonderful-world-ahead-u87ctga',
    title: 'What a wonderful world',
    description: 'This describes a world that is wonderful',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    `,
    userId: 1,
    isArchived: true,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'time-is-Great-for-you-u87dsyths',
    title: 'time is Great',
    description: 'Third descriptive title',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    `,
    userId: 2,
    isArchived: false,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'what-a-wonderful-world-ahead-of-you-u87ctga',
    title: 'What a wonderful world of you',
    description: 'This describes a world that is wonderful',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    `,
    userId: 1,
    isArchived: true,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'what-a-wonderful-time-to-be-alive-witth-God-u87dsyths',
    title: 'what a wonderful time to be alive',
    description: 'Third descriptive title',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    `,
    userId: 2,
    isArchived: false,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'What-a-wonderful-world-time-to-say-be-u87ctga',
    title: 'What a wonderful world time to say',
    description: 'This describes a world that is wonderful',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    `,
    userId: 1,
    isArchived: true,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'What-a-wonderful-world-time-to-say-hi-u87dsyths',
    title: 'What a wonderful world time to say hi',
    description: 'Third descriptive title',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    `,
    userId: 2,
    isArchived: false,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'What-a-wonderful-world-to-live-u87ctga',
    title: 'What a wonderful world to live',
    description: 'This describes a world that is wonderful',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    `,
    userId: 1,
    isArchived: true,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'hello-world-u87ddd',
    title: 'hello world',
    description: 'It so much fun to be alive',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    `,
    userId: 3,
    isArchived: false,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

export default {
  up: queryInterface => queryInterface.bulkInsert('comments', [{
    content: 'This actually sucks',
    userId: 1,
    articleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'This actually good',
    userId: 1,
    articleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Try again later',
    userId: 1,
    articleId: 1,
    isArchived: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'This is shit',
    userId: 1,
    articleId: 1,
    isArchived: false,
    isAnUpdate: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'This actually isnt bad',
    userId: 2,
    articleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('comments', null, {})
};

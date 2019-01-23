export default {
  up: queryInterface => queryInterface.bulkInsert('ratings', [{
    userId: 1,
    stars: 4,
    articleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    stars: 3,
    articleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 7,
    stars: 1,
    articleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    stars: 5,
    articleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    stars: 3,
    articleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    stars: 5,
    articleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 7,
    stars: 1,
    articleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    stars: 4,
    articleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    stars: 2,
    articleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    stars: 1,
    articleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 7,
    stars: 5,
    articleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    stars: 3,
    articleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    stars: 1,
    articleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    stars: 4,
    articleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 7,
    stars: 3,
    articleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    stars: 1,
    articleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    stars: 3,
    articleId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    stars: 5,
    articleId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 7,
    stars: 5,
    articleId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    stars: 1,
    articleId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    stars: 4,
    articleId: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    stars: 4,
    articleId: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 7,
    stars: 3,
    articleId: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    stars: 2,
    articleId: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    stars: 1,
    articleId: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    stars: 5,
    articleId: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 7,
    stars: 3,
    articleId: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    stars: 4,
    articleId: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    stars: 5,
    articleId: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    stars: 4,
    articleId: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 7,
    stars: 2,
    articleId: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    stars: 2,
    articleId: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('ratings', null, {})
};

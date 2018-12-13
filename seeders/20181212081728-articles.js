/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('articles', [{
    slug: 'this-is-a-post-title-l78hgybf',
    title: 'This is a post title',
    description: 'Descriptive title',
    body: 'Content',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'this-is-the-second-post-title-mbjb7y',
    title: 'This is the second post title',
    description: 'Second descriptive title',
    body: 'Content from article creation',
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'this-is-third-post-title-u87ddsa',
    title: 'This is the third post title',
    description: 'Third descriptive title',
    body: 'Content from article creation',
    userId: 3,
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

/* eslint-disable no-unused-vars */

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('profiles', [{
    username: 'wale',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 1,
  },
  {
    username: 'segun',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 2,
  },
  {
    username: 'john',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 3,
  },
  {
    username: 'james',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 4,
  },
  {
    username: 'joe',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 5,
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

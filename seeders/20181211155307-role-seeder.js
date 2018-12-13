/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('roles', [{
    name: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'author',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'publisher',
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

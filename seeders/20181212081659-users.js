/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    email: 'admin@heimdal.com',
    password: '123456',
    emailVerification: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 1,
  },
  {
    email: 'user@heimdal.com',
    password: '123456',
    emailVerification: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 2,
  },
  {
    email: 'publisher@heimdal.com',
    password: '$2a$08$Pg2qjiDZGPk/EpqZM2GB6u06MTMfsuOuVYxEYlH/p7F7/bjwqP3eu',
    emailVerification: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 3,
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

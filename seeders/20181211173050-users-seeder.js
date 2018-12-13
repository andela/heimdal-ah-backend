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
    email: 'author@heimdal.com',
    password: '123456',
    emailVerification: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 3,
  },
  {
    email: 'publisher@heimdal.com',
    password: '123456',
    emailVerification: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 2,
  },
  {
    email: 'publisherb@heimdal.com',
    password: '$2a$08$GZ7U.h/mX.Ny1Ma5E8fAaewXJbRWDn0u2xjRZzatXP3A14DnckdzS',
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

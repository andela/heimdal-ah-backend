/* eslint-disable no-unused-vars */
import bcrypt from 'bcryptjs';

const genSalt = bcrypt.genSaltSync(8);
const hashPassword = bcrypt.hashSync('12345678heimdal', genSalt);
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    email: 'admin@heimdal.com',
    password: hashPassword,
    emailVerification: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 1,
  },
  {
    email: 'user@heimdal.com',
    password: hashPassword,
    emailVerification: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 2,
  },
  {
    email: 'author@heimdal.com',
    password: hashPassword,
    emailVerification: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 3,
  },
  {
    email: 'publisher@heimdal.com',
    password: hashPassword,
    emailVerification: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 4,
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};

/* eslint-disable no-unused-vars */
import Chance from 'chance';

const chance = new Chance();

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('profiles', [{
    username: 'wale',
    biodata: chance.sentence({ words: 100 }),
    firstName: 'Ayandiran',
    lastName: 'Wale',
    image: 'https://hardwaremassive.com/sites/default/files/avatar/users/ian_square_profile_picture.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 1,
  }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('profiles', null, {})
};

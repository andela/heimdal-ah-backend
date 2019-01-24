/* eslint-disable no-unused-vars */
import Chance from 'chance';

const chance = new Chance();

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('profiles', [{
    username: 'segun',
    biodata: chance.sentence({ words: 100 }),
    firstName: 'Sunny',
    lastName: 'Edogbo',
    image: 'http://telecommsult.nl/wp-content/uploads/2016/07/brad-profile-square.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 2,
  },
  {
    username: 'john',
    biodata: chance.sentence({ words: 100 }),
    firstName: 'Jonathan',
    lastName: 'Edwards',
    image: 'http://sunrift.com/wp-content/uploads/2014/12/Blake-profile-photo-square.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 3,
  },
  {
    username: 'james',
    biodata: chance.sentence({ words: 100 }),
    firstName: 'Victor',
    lastName: 'Obije',
    image: 'http://www.samra.co.za/wp-content/uploads/2015/04/Andy-Hadfield-Profile-SQUARE-Low-Res.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 4,
  },
  {
    username: 'joe',
    biodata: chance.sentence({ words: 100 }),
    firstName: 'Pereowei',
    lastName: 'Izontimi',
    image: 'https://static1.squarespace.com/static/5249245ae4b0c38c3f1d6415/t/5bad0c248165f5f3c2e122ad/1538067498769/1.+Kurt+square+profile+pic+updated.JPG?format=300w',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 5,
  },
  {
    username: 'user1',
    biodata: chance.sentence({ words: 100 }),
    firstName: 'Timothy',
    lastName: 'Omotayo',
    image: 'http://d38we5ntdyxyje.cloudfront.net/295552/profile/avatar_medium_square.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 6,
  },
  {
    username: 'Nancy',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 7,
  },
  {
    username: 'hannah',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 8,
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('profiles', null, {})
};

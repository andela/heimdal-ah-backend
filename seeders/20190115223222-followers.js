export default {
  up: queryInterface => queryInterface.bulkInsert('followers', [{
    id: 2,
    followerId: 2,
    followedId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    followerId: 1,
    followedId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    followerId: 1,
    followedId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('followers', null, {})
};

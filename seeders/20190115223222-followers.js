export default {
  up: queryInterface => queryInterface.bulkInsert('followers', [{
    id: 3,
    followerId: 2,
    followingId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    followerId: 1,
    followingId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    followerId: 1,
    followingId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('followers', null, {})
};

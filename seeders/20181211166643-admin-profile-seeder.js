/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('profiles', [{
    username: 'wale',
    biodata: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore molestias aspernatur temporibus est fuga culpa saepe ipsa similique numquam adipisci doloremque, voluptatum suscipit sapiente provident odio! Placeat voluptatem nisi voluptates! Optio officiis rerum neque, provident eos nihil mollitia reprehenderit error modi incidunt minima blanditiis nostrum amet totam quam a assumenda? Corrupti nam maiores possimus quisquam sed magni officiis consequatur praesentium nobis, quae delectus aut tenetur iste tempora molestiae rerum, iusto quis nisi officia amet? Fuga, quos molestias? Eius iusto tempore quisquam vitae blanditiis, voluptates magni eos? Omnis beatae, eligendi iste cumque nihil aliquam sint autem, sequi commodi ratione ipsum voluptas!Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore molestias aspernatur temporibus est fuga culpa saepe ipsa similique numquam adipisci doloremque, voluptatum suscipit sapiente provident odio! Placeat voluptatem nisi voluptates! Optio officiis rerum neque, provident eos nihil mollitia reprehenderit error modi incidunt minima blanditiis nostrum amet totam quam a assumenda? Corrupti nam maiores possimus quisquam sed magni officiis consequatur praesentium nobis, quae delectus aut tenetur iste tempora molestiae rerum, iusto quis nisi officia amet? Fuga, quos molestias? Eius iusto tempore quisquam vitae blanditiis, voluptates magni eos? Omnis beatae, eligendi iste cumque nihil aliquam sint autem, sequi commodi ratione ipsum voluptas!',
    firstName: 'Ayandiran',
    lastName: 'Wale',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 1,
  }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('profiles', null, {})
};

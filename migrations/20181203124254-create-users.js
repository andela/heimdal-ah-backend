/* eslint-disable no-unused-vars */

export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    emailVerification: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    facebookId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    googleId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    twitterId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    passwordReset: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users')
};

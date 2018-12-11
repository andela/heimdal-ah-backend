export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    articleSlug: {
      type: Sequelize.STRING,
      onDelete: 'CASCADE',
      references: {
        model: 'articles',
        key: 'slug',
        as: 'articleSlug'
      },
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
        as: 'userId'
      },
      allowNull: false
    },
    isAnUpdate: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    commentId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'comments',
        key: 'id',
        as: 'commentId'
      },
      allowNull: true
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
  down: queryInterface => queryInterface.dropTable('comments')
};

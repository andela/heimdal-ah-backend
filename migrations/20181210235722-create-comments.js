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
    articleId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'articles',
        key: 'id',
        as: 'articleId'
      },
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'profiles',
        key: 'userId',
        as: 'userId'
      },
      allowNull: false
    },
    isArchived: {
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

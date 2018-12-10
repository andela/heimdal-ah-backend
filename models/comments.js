export default (sequelize, DataTypes) => {
  const Comments = sequelize.define('comments', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isAnUpdate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});
  Comments.associate = (models) => {
    // associations can be defined here
    Comments.belongsTo(models.articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
    });
  };
  return Comments;
};

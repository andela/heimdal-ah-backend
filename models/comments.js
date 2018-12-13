export default (sequelize, DataTypes) => {
  const Comments = sequelize.define('comments', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isAnUpdate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Comments.associate = (models) => {
    // associations can be defined here
    Comments.belongsTo(models.articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
    });
    Comments.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Comments.hasMany(models.bookmarks, {
      foreignKey: 'commentId',
      as: 'comments'
    });
  };
  return Comments;
};

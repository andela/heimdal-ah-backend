export default(sequelize, DataTypes) => {
  const Replies = sequelize.define('replies', {
    content: DataTypes.STRING,
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Replies.associate = (models) => {
    // associations can be defined here
    Replies.belongsTo(models.comments, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE',
    });
    Replies.belongsTo(models.profiles, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Replies;
};

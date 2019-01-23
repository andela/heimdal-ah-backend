
export default (sequelize, DataTypes) => {
  const followers = sequelize.define('followers', {
    followerId: {
      type: DataTypes.INTEGER
    },
    followedId: {
      type: DataTypes.INTEGER
    }
  }, {});
  // eslint-disable-next-line no-unused-vars
  followers.associate = (models) => {
    followers.belongsTo(models.profiles, {
      foreignKey: 'followerId',
      onDelete: 'CASCADE',
    });

    followers.belongsTo(models.profiles, {
      foreignKey: 'followedId',
      onDelete: 'CASCADE',
    });
  };
  return followers;
};

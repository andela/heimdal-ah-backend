
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    googleId: DataTypes.STRING,
    twitterId: DataTypes.STRING,
    emailVerification: DataTypes.STRING,
  }, {});
  Users.associate = (models) => {
    // associations can be defined here
    Users.belongsTo(models.roles, {
      foreignKey: 'roleId',
      onDelete: 'CASCADE',
      as: 'roles',
    });
    Users.hasOne(models.profiles, {

    });
  };
  return Users;
};

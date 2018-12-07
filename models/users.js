export default (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    emailVerification: DataTypes.STRING,
    resettingPassword: DataTypes.BOOLEAN,
    facebookId: DataTypes.STRING,
    googleId: DataTypes.STRING,
    twitterId: DataTypes.STRING,
  }, {});
  // eslint-disable-next-line no-unused-vars
  Users.associate = (models) => {
    // associations can be defined here
    Users.hasOne(models.roles, {
      foreignKey: 'userId',
      as: 'roles'
    });
    Users.hasOne(models.profiles, {
    });
  };
  return Users;
};

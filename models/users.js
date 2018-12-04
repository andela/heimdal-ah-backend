
export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    emailVerification: DataTypes.STRING
  }, {});
  // eslint-disable-next-line no-unused-vars
  Users.associate = (models) => {
    // associations can be defined here
    Users.hasOne(models.Roles, {
      foreignKey: 'userId',
      as: 'roles',
    });
  };
  return Users;
};

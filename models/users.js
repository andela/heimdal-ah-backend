
export default (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    emailVerification: DataTypes.STRING
  }, {});
  // eslint-disable-next-line no-unused-vars
  Users.associate = (models) => {
    // associations can be defined here
    Users.hasOne(models.roles, {
      foreignKey: 'userId',
      as: 'roles',
      onDelete: 'CASCADE',
    });
    Users.hasOne(models.profiles, {
      foreignKey: 'userId',
      as: 'profiles',
      onDelete: 'CASCADE',
    });
  };
  return Users;
};

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      emailVerification: DataTypes.BOOLEAN
    },
    {}
  );
  User.associate = (/* models */) => {
    // associations can be defined here
    // User.hasOne(models.Profile, {
    //   foreignKey: 'id',
    //   as: 'profile'
    // });
  };

  return User;
};

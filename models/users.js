
export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    emailverification: DataTypes.STRING
  }, {});
  // eslint-disable-next-line no-unused-vars
  Users.associate = (models) => {
    // associations can be defined here
  };
  return Users;
};

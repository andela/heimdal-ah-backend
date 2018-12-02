
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    role: DataTypes.STRING
  }, {});
  // eslint-disable-next-line no-unused-vars
  Roles.associate = (models) => {
    // associations can be defined here
  };
  return Roles;
};

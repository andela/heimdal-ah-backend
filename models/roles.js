
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('roles', {
    name: DataTypes.STRING
  }, {});
  Roles.associate = (models) => {
    // associations can be defined here
    Roles.hasOne(models.users, {

    });
  };
  return Roles;
};

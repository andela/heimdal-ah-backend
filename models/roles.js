
export default (sequelize, DataTypes) => {
  const Roles = sequelize.define('roles', {
    role: DataTypes.STRING
  }, {});
  // eslint-disable-next-line no-unused-vars
  Roles.associate = (models) => {
    // associations can be defined here
    Roles.belongsTo(models.users, {
      foreign: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Roles;
};

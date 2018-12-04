
export default (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    role: DataTypes.STRING
  }, {});
  // eslint-disable-next-line no-unused-vars
  Roles.associate = (models) => {
    // associations can be defined here
    Roles.belongsTo(models.Users, {
      foreign: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Roles;
};

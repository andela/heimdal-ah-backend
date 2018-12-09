
module.exports = (sequelize, DataTypes) => {
  const Profiles = sequelize.define('profiles', {
    username: DataTypes.STRING,
    biodata: DataTypes.STRING,
    image: DataTypes.STRING,
    address: DataTypes.STRING,
    dateofbirth: DataTypes.STRING
  }, {});
  Profiles.associate = (models) => {
    // associations can be defined here
    Profiles.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Profiles;
};

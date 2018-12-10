
export default (sequelize, DataTypes) => {
  const Profiles = sequelize.define('profiles', {

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biodata: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    dateofbirth: {
      type: DataTypes.STRING,
    }
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

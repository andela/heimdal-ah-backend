export default (sequelize, DataTypes) => {
  const Profiles = sequelize.define('profiles', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    biodata: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateofbirth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  /* Profiles.associate = (models) => {
    Profiles.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  }; */
  return Profiles;
};

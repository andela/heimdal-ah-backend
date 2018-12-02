export default (sequelize, DataTypes) => {
  const profiles = sequelize.define('profiles', {
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

  /* profiles.associate = (models) => {
    profiles.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  }; */
  return profiles;
};

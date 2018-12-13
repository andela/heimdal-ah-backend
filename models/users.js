export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'users',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      emailVerification: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      resettingPassword: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    },
    {}
  );
  Users.associate = (models) => {
    // associations can be defined here
    Users.belongsTo(models.roles, {
      foreignKey: 'roleId',
      onDelete: 'CASCADE',
      as: 'roles',
    });
    Users.hasOne(models.profiles, {
      foreignKey: 'userId',
      as: 'profile'
    });
    Users.hasMany(models.articles, {
    });
    Users.hasOne(models.profiles, {});
    Users.hasMany(models.articles, {});
    Users.hasMany(models.bookmarks, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Users;
};

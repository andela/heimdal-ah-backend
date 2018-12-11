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
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      facebookId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      twitterId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      emailVerification: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      resettingPassword: DataTypes.BOOLEAN
    },
    {}
  );
  Users.associate = (models) => {
    // associations can be defined here
    Users.belongsTo(models.roles, {
      foreignKey: 'roleId',
      onDelete: 'CASCADE',
      as: 'roles'
    });
    Users.hasMany(models.articles, {
    });
    Users.hasOne(models.profiles, {});
  };
  return Users;
};

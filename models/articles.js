export default (sequelize, DataTypes) => {
  const Articles = sequelize.define('articles', {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});
  Articles.associate = (models) => {
    Articles.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Articles.hasMany(models.bookmarks, {
      foreignKey: 'userId',
      as: 'bookmarks'
    });
  };
  return Articles;
};

export default (sequelize, DataTypes) => {
  const Articles = sequelize.define(
    'articles',
    {
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      isPublished: {
        type: DataTypes.STRING,
        defaultValue: false
      },
      readingTime: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {}
  );
  Articles.associate = (models) => {
    Articles.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Articles.hasMany(models.bookmarks, {
      foreignKey: 'userId',
      as: 'bookmarks'
    });
    Articles.belongsToMany(models.tags, {
      through: 'ArticleTag',
      as: 'tags',
      foreignKey: 'articleId'
    });
  };
  return Articles;
};

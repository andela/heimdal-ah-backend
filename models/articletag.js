module.exports = (sequelize, DataTypes) => {
  const ArticleTag = sequelize.define(
    'ArticleTag',
    {
      articleId: DataTypes.INTEGER,
      tagId: DataTypes.INTEGER
    },
    {}
  );
  ArticleTag.associate = (models) => {
    // associations can be defined here
    ArticleTag.belongsTo(models.Article, {
      foreignKey: 'articleId'
    });
    ArticleTag.belongsTo(models.Tag, {
      foreignKey: 'tagId'
    });
  };
  return ArticleTag;
};

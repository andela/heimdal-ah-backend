export default (sequelize, DataTypes) => {
  const Article = sequelize.define(
    'Article',
    {
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      userId: DataTypes.STRING,
      isPublished: DataTypes.STRING,
      readingTime: DataTypes.STRING
    },
    {}
  );
  Article.associate = (models) => {
    // associations can be defined here
    Article.belongsToMany(models.Tag, {
      through: 'ArticleTag',
      as: 'tags',
      foreignKey: 'articleId'
    });
  };
  return Article;
};

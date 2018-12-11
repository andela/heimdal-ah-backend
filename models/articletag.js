module.exports = (sequelize, DataTypes) => {
  const ArticleTag = sequelize.define(
    'ArticleTag',
    {
      articleId: DataTypes.INTEGER,
      tagId: DataTypes.INTEGER
    },
    {}
  );
  ArticleTag.associate = (/* models */) => {
    // associations can be defined here
  };
  return ArticleTag;
};

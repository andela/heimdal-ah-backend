export default (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      tagName: DataTypes.STRING
    },
    {}
  );
  Tag.associate = (models) => {
    // associations can be defined here
    Tag.belongsToMany(models.Article, {
      through: 'ArticleTag',
      as: 'tags',
      foreignKey: 'tagId'
    });
  };
  return Tag;
};

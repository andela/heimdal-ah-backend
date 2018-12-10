export default (sequelize, DataTypes) => {
  const Articles = sequelize.define('articles', {
    title: DataTypes.STRING
  }, {});
  Articles.associate = (models) => {
    // associations can be defined here
    Articles.hasMany(models.comments, {
      foreignKey: 'articleId',
      as: 'comments',
    });
  };
  return Articles;
};

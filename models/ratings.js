export default (sequelize, DataTypes) => {
  const Ratings = sequelize.define('ratings', {
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Ratings.associate = (models) => {
    Ratings.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Ratings.belongsTo(models.articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
    });
  };
  return Ratings;
};

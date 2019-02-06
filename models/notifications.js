export default (sequelize, DataTypes) => {
  const notifications = sequelize.define('notifications', {
    userId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    type: DataTypes.STRING,
    isRead: DataTypes.BOOLEAN
  }, {});
  notifications.associate = (models) => {
    // associations can be defined here
    notifications.belongsTo(models.profiles, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE',
    });
  };
  return notifications;
};

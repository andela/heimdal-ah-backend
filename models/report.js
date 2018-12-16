export default (sequelize, DataTypes) => {
  const report = sequelize.define('report', {
    escalation: DataTypes.TEXT
  }, {});
  // eslint-disable-next-line no-unused-vars
  report.associate = (models) => {
    // associations can be defined here
  };
  return report;
};

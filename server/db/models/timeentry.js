'use strict';
module.exports = (sequelize, DataTypes) => {
  const TimeEntry = sequelize.define('TimeEntry', {
    chipId: DataTypes.BIGINT,
    location: DataTypes.BIGINT
  }, {});
  TimeEntry.associate = function(models) {
    TimeEntry.belongsTo(models.Participant, {
      foreignKey: 'chipId'
    });
  };
  return TimeEntry;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
    chipId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true
    },
    startNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true
  });
  Participant.associate = function(models) {
    Participant.hasMany(models.TimeEntry, {
      foreignKey: 'chipId',
    })
  };
  return Participant;
};

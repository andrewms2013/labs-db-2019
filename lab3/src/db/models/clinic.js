'use strict';
module.exports = (sequelize, DataTypes) => {
  const Clinic = sequelize.define('Clinic', {
    city: DataTypes.STRING,
    house: DataTypes.STRING,
    street: DataTypes.STRING,
    aviariesQuantity: DataTypes.NUMBER
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'Clinic'
  });
  Clinic.associate = function(models) {
    Clinic.hasMany(models.Client, {
      foreignKey: 'clinic_id'
    });
    Clinic.hasMany(models.Doctor, {
      foreignKey: 'clinic_id'
    })
  };
  return Clinic;
};

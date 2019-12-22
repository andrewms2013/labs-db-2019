'use strict';
module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define('Doctor', {
    qualification: DataTypes.STRING,
    clinicId: DataTypes.NUMBER,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    speciality: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'Doctor'
  });
  Doctor.associate = function(models) {
    Doctor.belongsToMany(models.Animal, {
      foreignKey: 'doctor_id',
      otherKey: 'animal_id',
      through: models.AnimalDoctor
    });
    Doctor.belongsTo(models.Clinic, {
      foreignKey: 'clinic_id'
    })
  };
  return Doctor;
};

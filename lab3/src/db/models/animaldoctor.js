'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnimalDoctor = sequelize.define('AnimalDoctor', {
    animalId: DataTypes.NUMBER,
    doctorId: DataTypes.NUMBER
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'Animal_Doctor'
  });
  AnimalDoctor.associate = function(models) {
    // associations can be defined here
  };
  return AnimalDoctor;
};

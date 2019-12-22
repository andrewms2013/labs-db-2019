'use strict';
module.exports = (sequelize, DataTypes) => {
  const Animal = sequelize.define('Animal', {
    birthdate: DataTypes.DATE,
    clientId: DataTypes.NUMBER,
    animalPassportId: DataTypes.NUMBER,
    name: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'Animal'
  });
  Animal.associate = function(models) {
    Animal.belongsToMany(models.Doctor, {
      foreignKey: 'animal_id',
      otherKey: 'doctor_id',
      through: models.AnimalDoctor
    });
    Animal.belongsTo(models.Client, {
      foreignKey: 'client_id'
    })
  };
  return Animal;
};

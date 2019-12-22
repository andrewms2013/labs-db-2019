'use strict';
module.exports = (sequelize, DataTypes) => {
  const RemovedAnimal = sequelize.define('RemovedAnimal', {
    name: DataTypes.STRING,
    count: DataTypes.NUMBER
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'RemovedAnimal'
  });
  RemovedAnimal.associate = function(models) {
    // associations can be defined here
  };
  return RemovedAnimal;
};

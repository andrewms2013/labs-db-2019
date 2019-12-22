'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    hasDiscount: DataTypes.BOOLEAN,
    clinicId: DataTypes.NUMBER,
    name: DataTypes.STRING,
    surname: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'Client'
  });
  Client.associate = function(models) {
    Client.belongsTo(models.Clinic, {
      foreignKey: 'client_id'
    });
    Client.hasMany(models.Animal, {
      foreignKey: 'client_id'
    })
  };
  return Client;
};

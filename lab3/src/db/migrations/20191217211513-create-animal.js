'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Animal', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      birthdate: {
        type: Sequelize.DATE
      },
      clientId: {
        type: Sequelize.NUMBER,
        field: 'client_id'
      },
      animalPassportId: {
        type: Sequelize.NUMBER,
        field: 'animal_passport_id'
      },
      name: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Animal');
  }
};
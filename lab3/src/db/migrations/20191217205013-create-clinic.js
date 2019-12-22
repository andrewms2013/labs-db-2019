'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Clinic', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING
      },
      house: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      aviariesQuantity: {
        type: Sequelize.NUMBER,
        field: 'aviaries_quantity'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Clinic');
  }
};

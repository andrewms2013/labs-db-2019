'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Client', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hasDiscount: {
        type: Sequelize.BOOLEAN,
        field: 'has_discount'
      },
      clinicId: {
        type: Sequelize.INTEGER,
        field: 'clinic_id'
      },
      name: {
        type: Sequelize.STRING
      },
      surname: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Client');
  }
};

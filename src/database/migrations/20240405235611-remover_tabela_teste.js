'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.dropTable('testes');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.createTable('testes', {
      id: {
       allowNull: false,
       autoIncrement: true,
       primaryKey: true,
       type: Sequelize.INTEGER
      },
      nome: {
       allowNull: false,
       type: Sequelize.STRING
     },
      createdAt: {
       allowNull: false,
       type: Sequelize.DATE
     },
      updatedAt: {
       allowNull: false,
       type: Sequelize.DATE
     }
     });
  }
};

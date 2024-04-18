'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('professores', 'telefone', 'celular',{ 
      allowNull:true,
      type: Sequelize.DATE
    }); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('professores', 'celular');
  }
};

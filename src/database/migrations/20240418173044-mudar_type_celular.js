'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remover o campo 'celular' da tabela 'professores'
    await queryInterface.removeColumn('professores', 'celular');

    // Adicionar um novo campo 'celular' como tipo STRING na tabela 'professores'
    await queryInterface.addColumn('professores', 'celular', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    // Desfazer as alterações no método 'up' para reverter a migração
    await queryInterface.removeColumn('professores', 'celular');
    await queryInterface.addColumn('professores', 'celular', {
      type: Sequelize.DATE,
      allowNull: false
    });
  }
};

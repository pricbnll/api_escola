const { connection } = require("../database/connection");
const { DataTypes } = require('sequelize')

const Matricula = connection.define("matriculas", {
    aluno_id: {
        type: DataTypes.INTEGER
    },
    curso_id: {
        type: DataTypes.INTEGER
    }
})

//SEMPRE FAZER NA TABELA AUXILIAR TODAS OS RELACIONAMENTOS
//cada aluno possui varias matriculas .hasMany(Matricula, {foreignKey: 'id'})
// Matricula.belongsToMany(Alunos)

module.exports = Matricula
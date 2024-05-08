const Aluno = require("../models/Aluno");
const Matricula = require("../models/Matricula");
const Curso = require("../models/Curso");

class MatriculaController {
  async cadastrar(req, res) {
    try {
      const aluno_id = req.body.aluno_id;
      const curso_id = req.body.curso_id;

      //validar se nao veio o curso-id ou se nao veio um aluno_id. NAO DA CERTO SE EU COLOCO VAZIO, DA ERRO 400
      if (!curso_id || !aluno_id) {
        return res
          .status(409)
          .json({ mensagem: "O ID do aluno e do curso são obrigatórios" });
      }

      // //validar se id do aluno existe no banco de dados - model de ALuno
      const alunoExistente = await Aluno.findByPk(aluno_id);
      if (!alunoExistente) {
        res.status(404).json({ mensagem: "Aluno não existe" });
      }

      // //validar se o id do curso existe
      const cursoExistente = await Curso.findByPk(curso_id);
      if (!cursoExistente) {
        res.status(404).json({ mensagem: "Curso não existe" });
      }

      //Validar se ja existe o mesmo curso para o mesmo aluno - find no model matricula se ja existe
        const matriculaExistente = await Matricula.findOne({
          where: {
              curso_id: curso_id,
              aluno_id: aluno_id
          }
      })

      if (matriculaExistente) {
          return res.status(409).json({ mensagem: 'Aluno já cadastrado para esse curso' })
      }

      //chamar o model -que interage com a tabela - da matricula para passar os dados para dentro da matricula
      const matricula = await Matricula.create({
        aluno_id: aluno_id,
        curso_id: curso_id, //qdo nome da variável sao iguais da chave/objeto pode omitir a chave.
      });

      res.status(201).json(matricula);

    } catch (error) {
      res.status(500).json({ mensagem: "Não possível cadastrar a matricula" });
    }
  }

  async listarTodas(req, res) {
    try {
      const matriculas = await Matricula.findAll();
      res.json(matriculas);

    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Não foi possível listar todos os matriculas" });
    }
  }
}
module.exports = new MatriculaController();

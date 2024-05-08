const Aluno = require("../models/Aluno");

class AlunoController {
  // construtor - primeira coisa que é executado quando chama uma classe
  // métodos
  // atributos

  //colocar async na frente da palavra do método
  // chamar a dependência pelo models

  async cadastrar(req, res) {
    try {
      const nome = req.body.nome;
      const data_nascimento = req.body.data_nascimento;
      const celular = req.body.celular;
      const email = req.body.email;
      const password = req.body.password;

      if (!nome) {
        return res.status(400).json({ mensagem: "O nome é obrigatório" });
      }
      if (!data_nascimento) {
        return res
          .status(400)
          .json({ mensagem: "A data de nascimento é obrigatória" });
      }
      if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
        return res.status(400).json({
          mensagem: "A data de nascimento não está no formato correto",
        });
      }

      const aluno = await Aluno.create({
        nome: nome,
        data_nascimento: data_nascimento,
        celular: celular,
        email: email,
        password: password,
      });

      res.status(201).json(aluno);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ mensagem: "Não possível cadastrar o aluno" });
    }
  }

  //Rota Para listar todos os alunos pode usar a mesma rota para listar alunos pelo nome (e DEVE SER UMA ROTA , NAO USAR 2X --> "/alunos") - //http://localhost:3300/alunos
  async listarTodos(req, res) {
    try {
      const alunos = await Aluno.findAll();
      res.json(alunos);
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Não foi possível listar todos os alunos" });
    }
  }

  // Rota para listar alunos pelo id
  //http://localhost:3300/alunos/:id
  async listarUm(req, res) {
    try {
      const { id } = req.params;

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(404).json({ mensagem: "Aluno não encontrado." });
      }
      res.json(aluno);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ mensagem: "Não foi possível listar o aluno específico" });
    }
  }

  // Rota para atualizar aluno pelo id
  //http://localhost:3300/alunos/1
  async atualizar(req, res) {
    try {
      const { id } = req.params;

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(404).json({ mensagem: "Aluno não encontrado" });
      }
      aluno.update(req.body);

      await aluno.save();

      res.status(200).json(aluno);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ mensagem: "Não foi possível atualizar o cadastro do aluno" });
    }
  }

  // Rota para deletar alunos pelo id
  //http://localhost:3300/alunos/1
  async deletarUm(req, res) {
    const { id } = req.params;
    try {
      const aluno = await Aluno.findByPk(id);
      if (!aluno) {
        return res.status(404).json({ mensagem: "Aluno não encontrado." });
      }
      // const cursoDeletado = { ...curso.toJSON() };   // Armazena os dados do curso antes de deletá-lo
      await Aluno.destroy({
        where: {
          id: id,
        },
      });

      // res.status(200).json(cursoDeletado)
      res.status(204).json();
    } catch (error) {
      console.error("Erro ao deletar aluno:", error);
      res.status(500).json({ mensagem: "Erro ao deletar aluno." });
    }
  }

  // Rota para deletar todos os alunos
  async deletarTodos(req, res) {
    try {
      // Deleta todos os registros da tabela Alunos
      await Aluno.destroy({
        where: {}, // Sem condições, deletará todos os registros
      });

      res
        .status(200)
        .json({ mensagem: "Todos os alunos foram deletados com sucesso." });
    } catch (error) {
      // console.error('Erro ao deletar alunos:', error);
      res.status(500).json({ mensagem: "Erro ao deletar alunos." });
    }
  }
}

module.exports = new AlunoController(); //para instanciar a classe

// POTENCIAL!!!! que traz o req.payload : alunoRoutes.get("/alunos/alterar_senha", auth,  async (req, res) => {id = req.payload.sub

//------------ OUTRAS IDEIAS----------
// Rota para listar alunos pelo nome
//http://localhost:3300/alunos
// alunoRoutes.get("/", auth, async (req, res) => {
//   try {

//     if (req.query.nome) {
//       params = { ...params, nome: req.query.nome };
//     }

//     const aluno = await Aluno.findAll({
//       where: params,
//     });

//     res.status(200).json(aluno);
//   } catch (error) {
//     console.log(error.message);
//     res
//       .status(500)
//       .json({ mensagem: "Não foi possível listar o aluno específico" });
//   }
// });

//outro código mais simples mas utiliza o de cima
// alunoRoutes.get('/', async (req, res) => {
//     const nome = req.query.nome || ''
//     if (nome) {
//         const alunos = await Curso.findAll({
//             where: {
//                 nome: nome
//             }
//         })
//         return res.json(alunos)
//     }
//     const alunos = await Curso.findAll()
//     res.json(alunos)
//     })

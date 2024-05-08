const Curso = require("../models/Curso");

class CursoController {
  // Rota para adicionar novos cursos
  //http://localhost:3300/cursos
  async cadastrar(req, res) {
    try {
      const nome = req.body.nome;
      const duracao_horas = req.body.duracao_horas;

      if (!nome) {
        return res.status(400).json({ mensagem: "O nome é obrigatório" });
      }
      if (!(duracao_horas >= 40 && duracao_horas <= 200)) {
        return res.status(400).json({
          mensagem: "A duração do curso deve ser entre 40 e 200 horas",
        });
      }

      const curso = await Curso.create({
        nome: nome,
        duracao_horas: duracao_horas,
      });

      res.status(201).json(curso);
    } catch (error) {
      // console.log(error.message)
      res.status(500).json({ mensagem: "Não possível cadastrar o curso" });
    }
  }

  // Rota para listar cursos pelo nome
  //http://localhost:3300/cursos
  async listarPeloNome(req, res) {
    try {
      let params = {};

      //Se for passado um parâmetro QUERY chamado "nome" na requisição, então esse parâmetro "nome"é adicionado dentro da variável params

      if (req.query.nome) {
        //o ...params cria uma cópia do params com as chaves e valores já existentes
        params = { ...params, nome: req.query.nome };
      }

      const cursos = await Curso.findAll({
        where: params,
      });

      res.json(cursos);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ mensagem: "Não foi possível listar o curso específico" });
    }
  }

  // Rota para listar curso pelo id
  //http://localhost:3300/cursos/:id
  async listarUm(req, res) {
    try {
      const { id } = req.params;

      const curso = await Curso.findByPk(id);

      if (!curso) {
        return res
          .status(404)
          .json({ mensagem: "Curso não encontrado. Tente outro id." });
      }
      res.json(curso);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ mensagem: "Não foi possível listar o curso específico" });
    }
  }

  // Rota para listar cursos por nome e duração
  async listarNomeDuracao(req, res) {
    try {
      let params = {};
      if (req.query.nome) {
        // o ...params, cria uma cópia do params com os chaves e valores já existentes
        params = { ...params, nome: req.query.nome };
      }

      if (req.query.duracao_horas) {
        // o ...params, cria uma cópia do params com os chaves e valores já existentes
        params = { ...params, duracao_horas: req.query.duracao_horas };
      }
      res.json(cursos);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ mensagem: "Não foi possível listar o curso específico" });
    }
  }

  //OU este pelo ChatGpt
  // cursoRoutes.get("/", auth,  async (req, res) => {
  //   try {
  //     const { nome, duracao_horas } = req.query;
  //     const condicao = {};

  //     if (nome) {
  //       condicao.nome = { [Sequelize.iLike]: `%${nome}%` }; // Procura por parte do nome ignorando maiúsculas/minúsculas
  //     }
  //     if (duracao_horas) {
  //       const duracaoInt = parseInt(duracao_horas);
  //       if (!isNaN(duracaoInt)) {
  //         condicao.duracao_horas = { [Sequelize.eq]: duracaoInt };
  //       }
  //     }
  //     const cursos = await Curso.findAll({
  //       where: condicao,
  //     });

  //     res.json(cursos);
  //   } catch (error) {
  //     console.error("Erro ao buscar cursos:", error);
  //     res.status(500).json({ mensagem: "Erro ao buscar cursos." });
  //   }
  // });

  // Rota para atualizar curso pelo id
  //http://localhost:3300/cursos/1
  async atualizar(req, res) {
    const { id } = req.params;
    const { nome, duracao_horas } = req.body;

    try {
      const curso = await Curso.findByPk(id);

      if (!curso) {
        return res.status(404).json({ mensagem: "Curso não encontrado." });
      }
      curso.nome = nome;
      curso.duracao_horas = duracao_horas;

      await curso.save();

      res.status(200).json(curso);
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
      res.status(500).json({ mensagem: "Erro ao atualizar curso." });
    }
  }

  // Rota para deletar CURSO pelo id
  //http://localhost:3300/cursos/1
  async deletarUm(req, res) {
    const { id } = req.params;
    try {
      const curso = await Curso.findByPk(id);
      if (!curso) {
        return res.status(404).json({ mensagem: "ID não encontrado." });
      }
      // const cursoDeletado = { ...curso.toJSON() };   // Armazena os dados do curso antes de deletá-lo
      await Curso.destroy({
        where: {
          id: id,
        },
      });

      // res.status(200).json(cursoDeletado)
      res.status(204).json();
    } catch (error) {
      console.error("Erro ao deletar curso:", error);
      res.status(500).json({ mensagem: "Erro ao deletar curso." });
    }
  }

  // Rota para deletar todos os cursos
  async deletarTodos(req, res) {
    try {
      await Curso.destroy({
        where: {},
      });

      res
        .status(200)
        .json({ error: "Todos os cursos foram deletados com sucesso." });
    } catch (error) {
      // console.error('Erro ao deletar cursos:', error);
      res.status(500).json({ mensagem: "Erro ao deletar cursos." });
    }
  }
}
module.exports = new CursoController();

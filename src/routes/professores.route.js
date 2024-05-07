const { Router } = require("express"); //
const Professor = require("../models/Professor");
const { auth } = require("../middleware/auth");

const professorRoutes = new Router();

//Rota para adicionar novo professor e validar os dados
//http://localhost:3300/professores
professorRoutes.post("/", auth, async (req, res) => {
  try {
    const nome = req.body.nome;
    const celular = req.body.celular;
    const especialidade = req.body.especialidade;

    if (!nome) {
      return res.status(400).json({ mensagem: "O nome é obrigatório" });
    }
    if (!celular) {
      return res
        .status(400)
        .json({ mensagem: "O número do celular é obrigatória" });
    }
    // if (!celular.match(/^((5{2})?(\d{2})?([987])?(\d{4})(\d{4}))$/)) {
    //   //5548998132222 ou 48998132222 ou 998132222
    //   return res
    //     .status(400)
    //     .json({ mensagem: "O número do celular não está no formato correto." });
    function MascaraTelefone(tel) {
      if (!mascaraInteiro(tel)) {
        return res.status(400).json({
          mensagem:
            "O número do celular não está no formato correto, por favor digite (00) 0000-0000",
        });
      }
      return formataCampo(tel, "(00) 0000-0000");
      // console.log(error)
    }
    if (!especialidade) {
      return res
        .status(400)
        .json({ mensagem: "A  especialidade do professor é obrigatório" });
    }

    const professor = await Professor.create({
      nome: nome,
      celular: celular,
      especialidade: especialidade,
    });

    res.status(201).json(professor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ mensagem: "Não possível cadastrar o professor." });
  }
});

// Rota para listar professores pelo nome
//http://localhost:3300/professores
professorRoutes.get("/", auth, async (req, res) => {
  try {
    let params = {};

    if (req.query.nome) {
      params = { ...params, nome: req.query.nome };
    }

    const professor = await Professor.findAll({
      where: params,
    });

    res.status(200).json(professor);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ mensagem: "Não foi possível listar o professor específico" });
  }
});

// Rota para listar professores pelo id
//http://localhost:3300/alunos/:id
professorRoutes.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const professor = await Professor.findByPk(id);

    if (!professor) {
      return res.status(404).json({ mensagem: "Professor não encontrado." });
    }
    res.json(professor);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ mensagem: "não foi possível listar o professor específico" });
  }
});

// Rota para atualizar professor pelo id
//http://localhost:3300/professores/1
professorRoutes.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const professor = await Professor.findByPk(id);

    if (!professor) {
      return res.status(404).json({ mensagem: "Professor não encontrado" });
    }
    professor.update(req.body);

    await professor.save();

    res.status(200).json(professor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      mensagem: "Não foi possível atualizar o cadastro do professores",
    });
  }
});

// Rota para deletar professor pelo id
//http://localhost:3300/professores/1
professorRoutes.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const professor = await Professor.findByPk(id);
    if (!professor) {
      return res.status(404).json({ mensagem: "Professor não encontrado." });
    }
    const professorDeletado = { ...professor.toJSON() };
    await Professor.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json(professorDeletado);
    res.status(204).json();
  } catch (error) {
    console.error("Erro ao deletar professor:", error);
    res.status(500).json({ mensagem: "Erro ao deletar professor." });
  }
});

// Rota para deletar todos os professores
professorRoutes.delete("/", auth, async (req, res) => {
  try {
    await Professor.destroy({
      where: {},
    });

    res
      .status(200)
      .json({ mensagem: "Todos os professores foram deletados com sucesso." });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao deletar professores." });
  }
});

module.exports = professorRoutes;

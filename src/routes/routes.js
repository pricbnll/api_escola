const { Router } = require("express"); //
const Aluno = require("../models/Aluno");
const Curso = require("../models/Curso");
const Professor = require("../models/Professor")

const routes = new Router();

// GET - Lista alguma coisa
// POST - Criar/adicionar algo
// PUT - Atualizar algo
// DELETE - Deleta algo
// PATCH - depois

// BODY PARAMS POST/PUT
// ROUTE PARAMS /1 PUT e DELETE , GET
// QUERY PARAMS ?id=1 GET

// criar uma rota
// tipo
// path
// implementacao

//rota bem vindo
routes.get("/bem_vindo", (req, res) => {
  res.json({ name: "Bem vindo" });
});

//CRUD PARA ALUNOS

//Rota para adicionar novo aluno e validar os dados
//http://localhost:3300/alunos
routes.post("/alunos", async (req, res) => {
  try {
    const nome = req.body.nome;
    const data_nascimento = req.body.data_nascimento;
    const celular = req.body.celular;

    if (!nome) {
      return res.status(400).json({ mensagem: "O nome é obrigatório" });
    }
    if (!data_nascimento) {
      return res
        .status(400)
        .json({ mensagem: "A data de nascimento é obrigatória" });
    }
    if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
      return res
        .status(400)
        .json({ messagem: "A data de nascimento não está no formato correto" });
    }

    const aluno = await Aluno.create({
      nome: nome,
      data_nascimento: data_nascimento,
      celular: celular,
    });

    res.status(201).json(aluno);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ mensagem: "Não possível cadastrar o aluno" });
  }
});

//Rota Para listar todos os alunos pode usar a mesma rota para listar alunos pelo nome (e DEVE SER UMA ROTA , NAO USAR 2X)
// //http://localhost:3300/alunos
// routes.get("/alunos"/todos"", async (req, res) => {
//   const alunos = await Aluno.findAll();
//   res.json(alunos);
// });

// Rota para listar alunos pelo nome
//http://localhost:3300/alunoss
routes.get("/alunos", async (req, res) => {
  try {
    let params = {};

    if (req.query.nome) {
      params = { ...params, nome: req.query.nome };
    }

    const aluno = await Aluno.findAll({
      where: params,
    });

    res.status(200).json(aluno);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ mensagem: "Não foi possível listar o aluno específico" });
  }
});

//outro código mais simples mas utiliza o de cima
// routes.get('/cursos', async (req, res) => {
//     const nome = req.query.nome || ''
//     if (nome) {
//         const cursos = await Curso.findAll({
//             where: {
//                 nome: nome
//             }
//         })
//         return res.json(cursos)
//     }
//     const cursos = await Curso.findAll()
//     res.json(cursos)
//     })

// Rota para listar alunos pelo id
//http://localhost:3300/alunos/:id
routes.get("/alunos/:id", async (req, res) => {
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
      .json({ mensagem: "não foi possível listar o aluno específico" });
  }
});

// Rota para atualizar aluno pelo id
//http://localhost:3300/alunos/1
routes.put("/alunos/:id", async (req, res) => {
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
});

// Rota para deletar alunos pelo id
//http://localhost:3300/alunos/1
routes.delete("/cursos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const aluno = await Curso.findByPk(id);
    if (!aluno) {
      return res.status(404).json({ mensagem: "Aluno não encontrado." });
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
    console.error("Erro ao deletar aluno:", error);
    res.status(500).json({ mensagem: "Erro ao deletar aluno." });
  }
});

// Rota para deletar todos os alunos
routes.delete("/alunos", async (req, res) => {
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
});

//CRUD DE CURSOS

// Rota para adicionar novos cursos
//http://localhost:3300/cursos
routes.post("/cursos", async (req, res) => {
  try {
    const nome = req.body.nome;
    const duracao_horas = req.body.duracao_horas;

    if (!nome) {
      return res.status(400).json({ mensagem: "O nome é obrigatório" });
    }
    if (!(duracao_horas >= 40 && duracao_horas <= 200)) {
      return res
        .status(400)
        .json({ mensagem: "A duração do curso deve ser entre 40 e 200 horas" });
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
});

// Rota para listar cursos pelo nome
//http://localhost:3300/cursos
routes.get("/cursos", async (req, res) => {
  try {
    let params = {};

    if (req.query.nome) {
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
});

// Rota para listar curso pelo id
//http://localhost:3300/cursos/:id
routes.get("/cursos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const curso = await Curso.findByPk(id);

    if (!curso) {
      return res.status(404).json({ mensagem: "Curso não encontrado." });
    }
    res.json(curso);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ mensagem: "Não foi possível listar o curso específico" });
  }
});

// Rota para listar cursos por nome e duração
routes.get("/cursos", async (req, res) => {
    try {
            let params = {};
        if(req.query.nome)  {
            // o ...params, cria uma cópia do params com os chaves e valores já existentes
            params = {...params, nome: req.query.nome}
        }

        if(req.query.duracao_horas)  {
            // o ...params, cria uma cópia do params com os chaves e valores já existentes
            params = {...params, duracao_horas: req.query.duracao_horas}
        }
        res.json(cursos);
        } catch (error) {
        console.log(error.message);
        res
            .status(500)
            .json({ mensagem: "Não foi possível listar o curso específico" });
    }
});

////OU este pelo ChatGpt
// routes.get("/cursos", async (req, res) => {
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
routes.put("/cursos/:id", async (req, res) => {
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
});

// Rota para deletar CURSO pelo id
//http://localhost:3300/cursos/1
routes.delete("/cursos/:id", async (req, res) => {
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
});

// Rota para deletar todos os cursos
routes.delete("/cursos", async (req, res) => {
  try {
    await Curso.destroy({
      where: {},
    });

    res
      .status(200)
      .json({  error: "Todos os cursos foram deletados com sucesso." });
  } catch (error) {
    // console.error('Erro ao deletar cursos:', error);
    res.status(500).json({ mensagem: "Erro ao deletar cursos." });
  }
});




//CRUD PARA PROFESSORES

//Rota para adicionar novo professor e validar os dados
//http://localhost:3300/professores
routes.post("/professores", async (req, res) => {
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
    if (!celular.match(/^((5{2})?(\d{2})?([987])?(\d{4})(\d{4}))$/)) {
      return res
        .status(400)
        .json({ mensagem: "O número do celular não está no formato correto" });
    }
    if(!especialidade) {
      return res.status(400).json({ mensagem: "A  especialidade do professor é obrigatório" });
    }

    const professor = await Professor.create({
      nome: nome,
      celular: celular,
      especialidade: especialidade
    });

    res.status(201).json(professoro);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ mensagem: "Não possível cadastrar o professor." });
  }
});



// ----------------------------/----------------------









// Rota para listar alunos pelo nome
//http://localhost:3300/alunoss
routes.get("/alunos", async (req, res) => {
  try {
    let params = {};

    if (req.query.nome) {
      params = { ...params, nome: req.query.nome };
    }

    const aluno = await Aluno.findAll({
      where: params,
    });

    res.status(200).json(aluno);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ mensagem: "Não foi possível listar o aluno específico" });
  }
});


// Rota para listar alunos pelo id
//http://localhost:3300/alunos/:id
routes.get("/alunos/:id", async (req, res) => {
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
      .json({ mensagem: "não foi possível listar o aluno específico" });
  }
});

// Rota para atualizar aluno pelo id
//http://localhost:3300/alunos/1
routes.put("/alunos/:id", async (req, res) => {
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
});

// Rota para deletar alunos pelo id
//http://localhost:3300/alunos/1
routes.delete("/cursos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const aluno = await Curso.findByPk(id);
    if (!aluno) {
      return res.status(404).json({ mensagem: "Aluno não encontrado." });
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
    console.error("Erro ao deletar aluno:", error);
    res.status(500).json({ mensagem: "Erro ao deletar aluno." });
  }
});

// Rota para deletar todos os alunos
routes.delete("/alunos", async (req, res) => {
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
});

module.exports = routes;

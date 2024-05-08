const { Router } = require("express"); //
const Aluno = require("../models/Aluno");
const { auth } = require("../middleware/auth");
const AlunoController = require("../controllers/AlunoController");

const alunoRoutes = new Router();

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
// implementação

//todas as rotas que quero que seja PRIVADA coloco o middleware <auth> na frente

alunoRoutes.post("/", AlunoController.cadastrar);

alunoRoutes.get("/", auth, AlunoController.listarTodos);

alunoRoutes.get("/:id", auth, AlunoController.listarUm);

alunoRoutes.put("/:id", auth, AlunoController.atualizar);

alunoRoutes.delete("/:id", auth, AlunoController.deletarUm);

alunoRoutes.delete("/", auth, AlunoController.deletarTodos);

module.exports = alunoRoutes;

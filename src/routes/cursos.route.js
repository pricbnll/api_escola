const { Router } = require("express"); //
const Curso = require("../models/Curso");
const { auth } = require("../middleware/auth");
const CursoController = require("../controllers/CursoController");

const cursoRoutes = new Router();

cursoRoutes.post("/", auth, CursoController.cadastrar);

cursoRoutes.get("/", auth, CursoController.listarPeloNome);

cursoRoutes.get("/:id", CursoController.listarUm);

cursoRoutes.get("/", auth, CursoController.listarNomeDuracao);

cursoRoutes.put("/:id", CursoController.atualizar);

cursoRoutes.delete("/:id", auth, CursoController.deletarUm);

cursoRoutes.delete("/", auth, CursoController.deletarTodos);

module.exports = cursoRoutes;

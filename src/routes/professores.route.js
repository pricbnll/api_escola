const { Router } = require("express"); //
const Professor = require("../models/Professor");
const { auth } = require("../middleware/auth");
const ProfessorController = require("../controllers/ProfessorController");

const professorRoutes = new Router();

professorRoutes.post("/", auth, ProfessorController.cadastrar);

professorRoutes.get("/", auth, ProfessorController.listarNome);

professorRoutes.get("/:id", auth, ProfessorController.listarUm);

professorRoutes.put("/:id", auth, ProfessorController.atualizar);

professorRoutes.delete("/:id", auth, ProfessorController.deletarUm);

professorRoutes.delete("/", auth, ProfessorController.deletarTodos);

module.exports = professorRoutes;

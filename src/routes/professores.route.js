const { Router } = require("express"); //
const { auth } = require("../middleware/auth");
const ProfessorController = require("../controllers/ProfessorController");

const ProfessorRoutes = new Router();

ProfessorRoutes.post("/", auth, ProfessorController.cadastrar);

ProfessorRoutes.get("/", auth, ProfessorController.listarNome);

ProfessorRoutes.get("/:id", auth, ProfessorController.listarUm);

ProfessorRoutes.put("/:id", auth, ProfessorController.atualizar);

ProfessorRoutes.delete("/:id", auth, ProfessorController.deletarUm);

ProfessorRoutes.delete("/", auth, ProfessorController.deletarTodos);


module.exports = ProfessorRoutes;

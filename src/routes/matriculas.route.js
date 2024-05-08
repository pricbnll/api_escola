const { Router } = require("express");
const { auth } = require("../middleware/auth");
const MatriculaController = require("../controllers/MatriculaController");

const matriculasRoutes = new Router();

matriculasRoutes.post("/", auth, MatriculaController.cadastrar);
matriculasRoutes.get("/", auth, MatriculaController.listarTodas);


module.exports = matriculasRoutes;

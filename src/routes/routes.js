const { Router } = require("express");
const alunoRoutes = require("./alunos.route");
const cursoRoutes = require("./cursos.route");
const loginRoutes = require("./login.route");
const matriculaRoutes = require("./matriculas.route");
const professorRoutes = require("./professores.route");
const rbacRoutes = require("./rbac.route");
//const {RbacRoutes} = require("./rbac.route"); //testar se funciona igual ao de cima chamado a função


const routes = Router();

routes.use("/alunos", alunoRoutes); //toda vez que tiver na alunoRoutes coloque /alunos na frente da rota
routes.use("/cursos", cursoRoutes);
routes.use("/matriculas", matriculaRoutes);
routes.use("/professores", professorRoutes);
routes.use("/login", loginRoutes);
routes.use("/rbac" , rbacRoutes);

module.exports = routes;

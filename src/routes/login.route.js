const { Router } = require("express"); //
const Aluno = require("../models/Aluno");

const loginRoutes = new Router();

//rota bem vindo
loginRoutes.get("/bem_vindo", (req, res) => {
  res.json({ Mensagem: "Bem vindo" });
});

loginRoutes.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      return res.status(400).json({ mensagem: "O email é obrigatório" });
    }

    if (!password) {
      return res.status(400).json({ mensagem: "O password é obrigatório" });
    }

    const aluno = await Aluno.findOne({
      where: { email: email, password: password },
    });

    if (!aluno) {
      return res.status(404).json({
        error: "Nenhum aluno corresponde a email e senha fornecidos!",
      });
    }

    //o que julgo importante ter no token
    const payload = { sub: aluno.id, email: aluno.email, nome: aluno.nome };
    //console.log(payload)
    // token terá este payload com esta chave secreta que esta o .env
    const token = sign(payload, process.env.SECRET_JWT);

    res.status(200).json({ Token: token });
  } catch (error) {
    return res.status(500).json({ error: error, mensagem: "Algo deu errado!" });
  }
});

module.exports = loginRoutes;

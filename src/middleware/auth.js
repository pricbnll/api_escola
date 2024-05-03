// Verificar a autenticidade do token informado!

const { verify } = require("jsonwebtoken")

async function auth(req, res, next) {
    try {
        console.log("Entramos no Middleware")

        const { authorization } = req.headers  //pego meu token = authorization

        req['payload'] = verify(authorization, process.env.SECRET_JWT)  // verifico meu payload junto com a chave secreta e guardo dentro da requisição - novo item na req que chama-se payload

        next()

    } catch (error) {
        return res.status(401).json({
            message: "Autenticação Falhou!",
            cause: error.message
        })
    }
}

module.exports = { auth }
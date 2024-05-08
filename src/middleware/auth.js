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

//OUTRO EXEMPLO DE AUTH.JS - https://github.com/douglas-cavalcante/api_Meetapp/blob/master/src/app/middlewares/auth.js
// import jwt from 'jsonwebtoken';
// import { promisify } from 'util';
// import authConfig from '../../config/auth';

// export default async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ error: 'Token not provided' });
//   }

//   const [, token] = authHeader.split(' ');

//   try {
//     const decoded = await promisify(jwt.verify)(token, authConfig.secret);
//     req.userId = decoded.id;
//     return next();
//   } catch (err) {
//     return res.status(401).json({ error: 'Token invalid' });
//   }
// };
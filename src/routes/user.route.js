const { Router } = require("express");
const userController = require('../controllers/UserController');


const userRouter = new Router()

userRouter.get('/', userController.findAll);
userRouter.get('/:id', userController.findById);
userRouter.post('/', userController.createNewUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;




// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/user.controller');
// // const { hasPermission } = require('../middleware/hasPermission');

// // router.get('/', hasPermission(['ler_usuarios']), userController.findAll);
// // router.get('/:id', hasPermission(['ler_usuarios']), userController.findById);
// // router.post('/', hasPermission(['criar_usuario']), userController.createNewUser);
// // router.put('/:id', hasPermission(['editar_usuario']), userController.deleteUser);

// router.get('/', userController.findAll);
// router.get('/:id', userController.findById);
// router.post('/', userController.createNewUser);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

// module.exports = router
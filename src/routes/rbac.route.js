const { Router } = require('express') 
const RbacController = require("../controllers/RbacController")

const RbacRoutes = new Router()
RbacRoutes.get("/listPermissions", RbacController.listPermissions)
RbacRoutes.get("/listRoles", RbacController.listRoles)
RbacRoutes.post("/createOnePermission", RbacController.createOnePermission)
RbacRoutes.post("/createOneRole", RbacController.createOneRole)

module.exports = RbacRoutes
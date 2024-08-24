const { Router } = require('express') 
const RbacController = require("../controllers/RbacController")

const RbacRoutes = new Router()
RbacRoutes.get("/listPermissions", RbacController.listPermissions)
RbacRoutes.get("/listRoles", RbacController.listRoles)
RbacRoutes.get("/listPermissionsByRole/:id", RbacController.listPermissionsByRole)
RbacRoutes.post("/createOnePermission", RbacController.createOnePermission)
RbacRoutes.post("/createOneRole", RbacController.createOneRole)
RbacRoutes.post("/addPermissionToRole", RbacController.addPermissionToRole)
RbacRoutes.post("/addUserToRole", RbacController.addRoleToUser)

module.exports = RbacRoutes
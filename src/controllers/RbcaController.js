const Permission = require("../models/Permission");
const PermissionRole = require("../models/PermissionRole");
const Role = require("../models/Role");
const User = require("../models/User");

class RbacController {
  async createOnePermission(req, res) {
    //cria uma permission
    try {
      const dados = req.body;

      if (!dados.descricao) {
        return res.status(400).send("A descrição é obrigatória");
      }

      const permissionExists = await Permission.findOne({
        where: { descricao: dados.description },
      });

      if (permissionExists) {
        return res
          .status(400)
          .send("Já existe uma permissão com essa descrição!");
      }

      const novo = await Permission.create(dados);

      return res.status(201).send(novo);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Algo deu errado!");
    }
  }
  async createOneRole() {
    try {
      const dados = req.body;

      if (!dados.descricao) {
        return res.status(400).send("A descrição é obrigatória");
      }

      const roleExists = await Role.findOne({
        where: { descricao: dados.descricao },
      });
      if (roleExists) {
        return res.status(400).send("Já existe uma função com essa descrição!");
      }

      const novo = await Role.create(dados);

      return res.status(201).send(novo);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Algo deu errado!");
    }
  }
  async listPermissions(req, res) {
    //lista todas as permission
    const data = await Permission.findAll();

    return res.status(200).send(data);
  }
  async listRoles(req, res) {
    //lista todas as roles
    const data = await Role.findAll();

    return res.status(200).send(data);
  }
  async listPermissionsByRole(req, res) {
    //lista todas as permissions de uma role
    try {
      const { id } = req.params;

      const role = await Role.findByPk(id, {
        include: [{ model: Permission }],
      });

      //   const role = await Role.findOne({
      //     where: { id },
      //     include: [{model: Permission}]
      // });

      if (!role) {
        return res.status(404).send("Role não encontrada!");
      }

      const permissions = await role.getPermissions(); //método gerado pelo sequelize, professor nao colocou!

      return res.status(200).send(permissions);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Algo deu errado!");
    }
  }
  async addRoleToUser(req, res) {
    //adiciona uma role a um usuário
    try {
      const { userId, roleId } = req.body;

      if (!userId || !roleId) {
        return res
          .status(404)
          .send("O id da permissão e/ou role é obrigatório!");
      }

      const roleExists = await Role.findByPk(roleId);
      const userExists = await Permission.findByPk(userId);

      if (!roleExists) {
        return res.status(400).send("Role não encontrada!");
      }
      if (!userExists) {
        return res.status(404).send("Usuário não encontrado!");
      }

      // 1ª forma
      const userRoleNovo = await PermissionRole.create({
        userId: userId,
        roleId: roleId,
      });

      return res.status(201).send(userRoleNovo);

    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Algo deu errado!");
    }
  }
  async addPermissionToRole(req, res) {
    //adiciona uma permission a uma role
    try {
      const { roleId, permissionId } = req.body;

      if (!roleId || !permissionId) {
        return res
          .status(404)
          .send("O id da permissão e/ou role é obrigatório!");
      }

      const roleExists = await Role.findByPk(roleId);
      const permissionExists = await Permission.findByPk(permissionId);

      if (!roleExists) {
        return res.status(400).send("Role não encontrada!");
      }
      if (!permissionExists) {
        return res.status(404).send("Permissão não encontrada!");
      }

      // 1ª forma
      const permissionRoleNovo = await PermissionRole.create({
        permissionId: permissionId,
        roleId: roleId,
      });

      // 2ª forma - método auxiliar criado pelo sequelize
      // await roleExists.addPermissions(permissionExists)

      return res.status(201).send(permissionRoleNovo);

    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Algo deu errado!");
    }
  }

  async createOnePermission() {}
  async createOneRole() {}
  async listPermissions() {}
  async listRoles() {}
  async listPermissionsByRole() {}
  async addPermissionToRole() {}
  async addRoleToUser() {}
}

module.exports = new RbacController();

const Permission = require("../models/Permission");
const Role = require("../models/Role");

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
  async createOneRole(req, res) {
    //cria uma role
    try {
      const dados = req.body;

      if (!dados.email && !dados.password) {
        return res.status(400).send("O email e a senha são obrigatórios");
      }

      const roleExists = await Role.findOne({ where: { email: dados.email } });

      if (roleExists) {
        return res.status(400).send("Já existe uma role com esse email!");
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

      const role = await Role.findByPk(id);

      if (!role) {
        return res.status(404).send("Role não encontrada!");
      }

      const permissions = await role.getPermissions(); //método gerado pelo sequelize

      return res.status(200).send(permissions);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Algo deu errado!");
    }
  }
  async addRoleToUser(req, res) {
    //adiciona uma role a um usuário
    try {
      const { idUser, idRole } = req.params; 
      
      const user = await User.findByPk(idUser); 
      const role = await Role.findByPk(idRole);
    
      if(!user || !role) {
        return res.status(404).send("Usuário e role não encontrados!");
    }   

    const [ result ] = await user.addRole(role); 
    return res.status(200).send(result);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Algo deu errado!");
    }
  }
  async addPermissionToRole(req, res) {
    //adiciona uma permission a uma role
    try {
      const { idRole, idPermission } = req.params; 
      
      const role = await Role.findByPk(idRole); 
      const permission = await Permission.findByPk(idPermission);

      if(!role || !permission) {
        return res.status(404).send("Role e permissão não encontradas!");
    }

      const [ result ] = await role.addPermission(permission); 
       return res.status(200).send(result);
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

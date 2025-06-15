const { Role } = require("../models");

class RoleService {
  async create(data) {
    return await Role.create(data);
  }

  async findAll() {
    return await Role.findAll();
  }

  async findById(id) {
    return await Role.findByPk(id);
  }

  async update(id, data) {
    const role = await Role.findByPk(id);
    if (!role) {
      const notFoundError = new Error("Role não encontrado");
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    return await role.update(data);
  }

  async delete(id) {
    const role = await Role.findByPk(id);
    if (!role) throw new Error("Role não encontrado");
    return await role.destroy(); // soft delete
  }

  async restore(id) {
    const role = await Role.findByPk(id, { paranoid: false }); // busca mesmo os deletados
    if (!role) throw new Error("Role não encontrado");
    return await role.restore();
  }
}

module.exports = new RoleService();

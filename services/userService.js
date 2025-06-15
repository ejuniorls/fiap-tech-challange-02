const { User } = require("../models");
const { generateUniqueSlug } = require("../utils/slug");
const hashPassword = require("../utils/hashPassword");

class UserService {
  async create(data) {
    // Gera o slug único a partir do nome
    data.slug = await generateUniqueSlug(User, data.username);

    // Criptografa a senha
    data.password = await hashPassword(data.password);

    return await User.create(data);
  }

  async findAll() {
    return await User.findAll();
  }

  async findById(id) {
    return await User.findByPk(id);
  }

  async update(id, data) {
    const user = await User.findByPk(id);
    if (!user) {
      const notFoundError = new Error("Usuário não encontrado");
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    // Atualiza apenas o slug se o username foi modificado
    if (data.username) {
      data.slug = await generateUniqueSlug(User, data.username);
    }

    // Criptografa a senha apenas se foi fornecida
    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    return await user.update(data);
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("Usuário não encontrado");
    return await user.destroy(); // soft delete
  }

  async restore(id) {
    const user = await User.findByPk(id, { paranoid: false }); // busca mesmo os deletados
    if (!user) throw new Error("Usuário não encontrado");
    return await user.restore();
  }
}

module.exports = new UserService();

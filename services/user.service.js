const { User } = require("../models");
const { generateUniqueSlug } = require("../utils/slug-generator.util");
const hashPassword = require("../utils/password-hash.util");
const bcrypt = require("bcryptjs"); // Adicione esta linha
const BaseService = require("./base.service");

class UserService extends BaseService {
  constructor() {
    super(User);
  }

  async create(data) {
    data.slug = await generateUniqueSlug(User, data.username);
    data.password = await hashPassword(data.password);
    return super.create(data);
  }

  async update(id, data) {
    if (data.username) {
      data.slug = await generateUniqueSlug(User, data.username);
    }
    if (data.password) {
      data.password = await hashPassword(data.password);
    }
    return super.update(id, data);
  }

  async findAllWithRoles() {
    return await User.findAll({
      include: [
        {
          association: "roles",
          attributes: ["id", "name", "description"],
          through: { attributes: [] },
        },
      ],
    });
  }

  async findByIdWithRoles(id) {
    return await User.findByPk(id, {
      include: [
        {
          association: "roles",
          attributes: ["id", "name", "description"],
          through: { attributes: [] },
        },
      ],
    });
  }

  async findByEmail(email) {
    try {
      const user = await this.model.scope("withPassword").findOne({
        where: {
          email,
          deleted_at: null,
        },
      });

      if (!user) {
        console.log("Usuário não encontrado para o email:", email);
        return null;
      }

      console.log("Usuário encontrado:", user.toJSON());
      return user;
    } catch (error) {
      console.error("Erro ao buscar usuário por email:", error);
      throw error;
    }
  }

  async verifyPassword(user, password) {
    try {
      if (!user || !user.password) {
        throw new Error("Objeto de usuário inválido ou senha não definida");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Resultado da comparação de senha:", isMatch);
      return isMatch;
    } catch (error) {
      console.error("Erro ao verificar senha:", error);
      throw error;
    }
  }
}

module.exports = new UserService();

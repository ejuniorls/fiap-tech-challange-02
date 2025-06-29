const { User } = require("../models");
const { generateUniqueSlug } = require("../utils/slug");
const hashPassword = require("../utils/hashPassword");
const BaseService = require("./BaseService");

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
}

module.exports = new UserService();

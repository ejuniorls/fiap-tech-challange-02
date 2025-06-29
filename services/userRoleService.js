const db = require("../models");

module.exports = {
  async findAll() {
    return await db.UserRole.findAll({
      include: [
        { model: db.User, as: "user" },
        { model: db.Role, as: "role" },
      ],
    });
  },

  async findByUserId(userId) {
    return await db.UserRole.findAll({
      where: { user_id: userId },
      include: [
        { model: db.User, as: "user" },
        { model: db.Role, as: "role" },
      ],
    });
  },

  async findByRoleId(roleId) {
    return await db.UserRole.findAll({
      where: { role_id: roleId },
      include: [
        { model: db.User, as: "user" },
        { model: db.Role, as: "role" },
      ],
    });
  },

  async create(userRoleData) {
    return await db.UserRole.create(userRoleData);
  },

  async delete(userId, roleId) {
    const userRole = await db.UserRole.findOne({
      where: { user_id: userId, role_id: roleId },
    });

    if (!userRole) {
      throw new Error("UserRole not found");
    }

    return await userRole.destroy();
  },

  async exists(userId, roleId) {
    const userRole = await db.UserRole.findOne({
      where: { user_id: userId, role_id: roleId },
    });
    return !!userRole;
  },
};

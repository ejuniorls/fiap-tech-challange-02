/* eslint-disable no-unused-vars */
"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Obter IDs dos usuários e roles existentes
    const [users, roles] = await Promise.all([
      queryInterface.sequelize.query("SELECT id FROM users;"),
      queryInterface.sequelize.query("SELECT id, name FROM roles;"),
    ]);

    const userIds = users[0].map((user) => user.id);
    const roleMap = {};
    roles[0].forEach((role) => {
      roleMap[role.name] = role.id;
    });

    // Definir as associações
    const userRolesData = [
      // Admin (gcazevedo)
      { user_id: userIds[0], role_id: roleMap["admin"] },

      // Moderadores (mariaclaras, pedrohenriquel)
      { user_id: userIds[1], role_id: roleMap["moderator"] },
      { user_id: userIds[2], role_id: roleMap["moderator"] },

      // Editores (anarodrigues, carlosferreira)
      { user_id: userIds[3], role_id: roleMap["editor"] },
      { user_id: userIds[4], role_id: roleMap["editor"] },

      // Usuários comuns (restantes)
      { user_id: userIds[5], role_id: roleMap["user"] },
      { user_id: userIds[6], role_id: roleMap["user"] },
      { user_id: userIds[7], role_id: roleMap["user"] },
      { user_id: userIds[8], role_id: roleMap["user"] },
      { user_id: userIds[9], role_id: roleMap["user"] },
    ];

    // Adicionar timestamps
    const userRoles = userRolesData.map((userRole) => ({
      ...userRole,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("user_roles", userRoles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_roles", null, {});
  },
};

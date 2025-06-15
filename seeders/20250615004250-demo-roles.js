/* eslint-disable no-unused-vars */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rolesData = [
      {
        name: "admin",
        description: "Administrador do sistema com acesso total",
      },
      {
        name: "user",
        description: "Usuário comum com permissões básicas",
      },
      {
        name: "moderator",
        description: "Moderador com permissões para gerenciar conteúdo",
      },
      {
        name: "editor",
        description: "Editor com permissões para criar e editar conteúdo",
      },
      {
        name: "guest",
        description: "Acesso limitado (convidado)",
      },
    ];

    // Adiciona timestamps (created_at e updated_at)
    const roles = rolesData.map((role) => ({
      ...role,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("roles", roles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};

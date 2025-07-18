/* eslint-disable no-unused-vars */
"use strict";

const { User } = require("../models");
const { generateUniqueSlug } = require("../utils/slug-generator.util");
const hashPassword = require("../utils/password-hash.util");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const usersData = [
      {
        username: "gcazevedo",
        email: "gcazevedo@outlook.com",
        password: "senha123",
        firstName: "Gabriel",
        lastName: "Azevedo",
        bio: "Farmacêutico",
      },
      {
        username: "mariaclaras",
        email: "mariaclara.silva@gmail.com",
        password: "mariaclara123",
        firstName: "Maria Clara",
        lastName: "Silva",
        bio: "Engenheira de Software",
      },
      {
        username: "pedrohenriquel",
        email: "pedro.lima@yahoo.com",
        password: "pedro456",
        firstName: "Pedro Henrique",
        lastName: "Lima",
        bio: "Médico Cardiologista",
      },
      {
        username: "anarodrigues",
        email: "ana.rodrigues@hotmail.com",
        password: "ana789",
        firstName: "Ana",
        lastName: "Rodrigues",
        bio: "Professora de História",
      },
      {
        username: "carlosferreira",
        email: "carlos.ferreira@gmail.com",
        password: "carlos2024",
        firstName: "Carlos",
        lastName: "Ferreira",
        bio: "Arquiteto",
      },
      {
        username: "julianasouza",
        email: "juliana.souza@outlook.com",
        password: "juliana123",
        firstName: "Juliana",
        lastName: "Souza",
        bio: "Designer Gráfico",
      },
      {
        username: "rafaelmendes",
        email: "rafael.mendes@yahoo.com",
        password: "rafa987",
        firstName: "Rafael",
        lastName: "Mendes",
        bio: "Advogado Criminalista",
      },
      {
        username: "fernandacosta",
        email: "fernanda.costa@gmail.com",
        password: "fernanda321",
        firstName: "Fernanda",
        lastName: "Costa",
        bio: "Nutricionista",
      },
      {
        username: "lucaspereira",
        email: "lucas.pereira@hotmail.com",
        password: "lucas654",
        firstName: "Lucas",
        lastName: "Pereira",
        bio: "Jornalista Esportivo",
      },
      {
        username: "amandarocha",
        email: "amanda.rocha@outlook.com",
        password: "amanda000",
        firstName: "Amanda",
        lastName: "Rocha",
        bio: "Psicóloga Clínica",
      },
    ];

    // Processamento dos usuários (hash de senha, slug, etc.)
    const users = await Promise.all(
      usersData.map(async (user) => {
        return {
          username: user.username,
          email: user.email,
          password: await hashPassword(user.password), // Senha hasheada
          first_name: user.firstName,
          last_name: user.lastName,
          bio: user.bio,
          avatar_url: `https://example.com/avatar/${user.username}.jpg`, // URL genérica
          slug: await generateUniqueSlug(User, user.username), // Slug único
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        };
      }),
    );

    // Inserção no banco de dados
    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};

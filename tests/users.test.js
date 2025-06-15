/* eslint-disable no-undef */
const request = require("supertest");
const { sequelize } = require("../models");
const app = require("../app");

jest.setTimeout(10000);

describe("Testes de integração com banco de dados", () => {
  let testUserId;
  let testUserData;

  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    testUserData = {
      username: "test.user",
      email: "test@example.com",
      password: "test123",
      firstName: "Test",
      lastName: "User",
    };

    const res = await request(app).post("/api/users").send(testUserData);

    testUserId = res.body.id;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("Operações básicas de usuário", () => {
    it("GET /api/users - deve retornar lista de usuários", async () => {
      const response = await request(app).get("/api/users").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      // Verifica que nenhum usuário retorna com senha
      response.body.forEach((user) => {
        expect(user.password).toBeUndefined();
      });
    });

    it("GET /api/users/:id - deve retornar 404 para usuário inexistente", async () => {
      await request(app).get("/api/users/99999").expect(404);
    });

    it("GET /api/users/:id - deve retornar usuário existente", async () => {
      const response = await request(app)
        .get(`/api/users/${testUserId}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: testUserId,
        username: testUserData.username,
        email: testUserData.email,
      });
      expect(response.body.password).toBeUndefined();
    });

    it("POST /api/users - deve criar um novo usuário", async () => {
      const newUser = {
        username: "novo.usuario",
        email: "novo@example.com",
        password: "senha123",
        firstName: "Novo",
        lastName: "Usuário",
      };

      const response = await request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201);

      expect(response.body).toMatchObject({
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      });
      expect(response.body.password).toBeUndefined();
    });
  });

  describe("Atualização de usuário", () => {
    it("PUT /api/users/:id - deve atualizar um usuário existente", async () => {
      const updatedData = {
        firstName: "Nome Atualizado",
        bio: "Nova biografia",
      };

      const response = await request(app)
        .put(`/api/users/${testUserId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body).toMatchObject(updatedData);
      expect(response.body.password).toBeUndefined();
    });

    it("PUT /api/users/:id - deve retornar 400 para dados inválidos", async () => {
      await request(app)
        .put(`/api/users/${testUserId}`)
        .send({ email: "email-invalido" })
        .expect(400);
    });

    it("PUT /api/users/:id - deve retornar 404 para usuário inexistente", async () => {
      await request(app)
        .put("/api/users/99999")
        .send({ firstName: "Inexistente" })
        .expect(404);
    });
  });

  describe("Remoção e restauração de usuário", () => {
    let tempUserId;

    beforeEach(async () => {
      // Cria um usuário temporário para cada teste
      const res = await request(app)
        .post("/api/users")
        .send({
          username: `temp.${Date.now()}`,
          email: `temp.${Date.now()}@example.com`,
          password: "temp123",
          firstName: "Temp",
          lastName: "User",
        });
      tempUserId = res.body.id;
    });

    it("DELETE /api/users/:id - deve remover um usuário (soft delete)", async () => {
      await request(app).delete(`/api/users/${tempUserId}`).expect(204);

      // Verifica soft delete diretamente no banco
      const deletedUser = await sequelize.models.User.findOne({
        where: { id: tempUserId },
        paranoid: false,
      });
      expect(deletedUser.deletedAt).not.toBeNull();
    });

    it("DELETE /api/users/:id - deve retornar 404 para usuário já removido", async () => {
      // Primeiro remove
      await request(app).delete(`/api/users/${tempUserId}`).expect(204);

      // Tenta remover novamente
      await request(app).delete(`/api/users/${tempUserId}`).expect(404);
    });

    it("POST /api/users/:id/restore - deve restaurar um usuário removido", async () => {
      // Primeiro remove
      await request(app).delete(`/api/users/${tempUserId}`).expect(204);

      // Restaura
      const restoreResponse = await request(app)
        .post(`/api/users/${tempUserId}/restore`)
        .expect(200);

      expect(restoreResponse.body.id).toBe(tempUserId);
      expect(restoreResponse.body.password).toBeUndefined();

      // Verifica se está acessível
      await request(app).get(`/api/users/${tempUserId}`).expect(200);
    });

    it("POST /api/users/:id/restore - deve retornar 404 para usuário inexistente", async () => {
      await request(app).post("/api/users/99999/restore").expect(404);
    });
  });
});

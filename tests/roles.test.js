/* eslint-disable no-undef */
const request = require("supertest");
const { sequelize } = require("../models");
const app = require("../app");

jest.setTimeout(10000);

describe("Testes de integração com banco de dados", () => {
  let testRoleId;
  let testRoleData;

  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    testRoleData = {
      name: "developer",
      description: "developer desc"
    };

    const res = await request(app).post("/api/roles").send(testRoleData);

    testRoleId = res.body.id;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("Operações básicas de role", () => {
    it("GET /api/roles - deve retornar lista de roles", async () => {
      const response = await request(app).get("/api/roles").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      // Verifica que nenhum role retorna com senha
      response.body.forEach((user) => {
        expect(user.password).toBeUndefined();
      });
    });

    it("GET /api/roles/:id - deve retornar 404 para role inexistente", async () => {
      await request(app).get("/api/roles/99999").expect(404);
    });

    it("GET /api/roles/:id - deve retornar role existente", async () => {
      const response = await request(app)
        .get(`/api/roles/${testRoleId}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: testRoleId,
        name: testRoleData.name,
        description: testRoleData.description
      });
    });

    it("POST /api/roles - deve criar um novo role", async () => {
      const newRole = {
        name: "admin",
        description: "administrator",
      };

      const response = await request(app)
        .post("/api/roles")
        .send(newRole)
        .expect(201);

      expect(response.body).toMatchObject({
        name: newRole.name,
        description: newRole.description,
      });
    });
  });

  describe("Atualização de role", () => {
    it("PUT /api/roles/:id - deve atualizar um role existente", async () => {
      const updatedData = {
        description: "desc atualizada",
      };

      const response = await request(app)
        .put(`/api/roles/${testRoleId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body).toMatchObject(updatedData);
    });

    it("PUT /api/roles/:id - deve retornar 400 para dados inválidos", async () => {
      await request(app)
        .put(`/api/roles/${testRoleId}`)
        .send({ name: "" })
        .expect(422);
    });

    it("PUT /api/roles/:id - deve retornar 404 para role inexistente", async () => {
      await request(app)
        .put("/api/roles/99999")
        .send({ name: "Inexistente" })
        .expect(404);
    });
  });

  describe("Remoção e restauração de role", () => {
    let tempRoleId;

    beforeEach(async () => {
      // Cria um role temporário para cada teste
      const res = await request(app)
        .post("/api/roles")
        .send({
          name: `temp.${Date.now()}`,
          description: `temp.${Date.now()}`,
        });
      tempRoleId = res.body.id;
    });

    it("DELETE /api/roles/:id - deve remover um role (soft delete)", async () => {
      await request(app).delete(`/api/roles/${tempRoleId}`).expect(204);

      // Verifica soft delete diretamente no banco
      const deletedUser = await sequelize.models.Role.findOne({
        where: { id: tempRoleId },
        paranoid: false,
      });
      expect(deletedUser.deletedAt).not.toBeNull();
    });

    it("DELETE /api/roles/:id - deve retornar 404 para role já removido", async () => {
      // Primeiro remove
      await request(app).delete(`/api/roles/${tempRoleId}`).expect(204);

      // Tenta remover novamente
      await request(app).delete(`/api/roles/${tempRoleId}`).expect(404);
    });

    it("POST /api/roles/:id/restore - deve restaurar um role removido", async () => {
      // Primeiro remove
      await request(app).delete(`/api/roles/${tempRoleId}`).expect(204);

      // Restaura
      const restoreResponse = await request(app)
        .post(`/api/roles/${tempRoleId}/restore`)
        .expect(200);

      expect(restoreResponse.body.id).toBe(tempRoleId);
      expect(restoreResponse.body.password).toBeUndefined();

      // Verifica se está acessível
      await request(app).get(`/api/roles/${tempRoleId}`).expect(200);
    });

    it("POST /api/roles/:id/restore - deve retornar 404 para role inexistente", async () => {
      await request(app).post("/api/roles/99999/restore").expect(404);
    });
  });
});

/* eslint-disable no-undef */
const request = require("supertest");
const { sequelize } = require("../models");
const app = require("../app");

jest.setTimeout(10000);

describe("Testes de integração com banco de dados", () => {
  let testCategoryId;
  let testCategoryData;

  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    testCategoryData = {
      name: "developer",
      description: "developer desc",
    };

    const res = await request(app)
      .post("/api/categories")
      .send(testCategoryData);

    testCategoryId = res.body.id;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("Operações básicas de category", () => {
    it("GET /api/categories - deve retornar lista de categories", async () => {
      const response = await request(app).get("/api/categories").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      // Verifica que nenhum category retorna com senha
      response.body.forEach((user) => {
        expect(user.password).toBeUndefined();
      });
    });

    it("GET /api/categories/:id - deve retornar 404 para category inexistente", async () => {
      await request(app).get("/api/categories/99999").expect(404);
    });

    it("GET /api/categories/:id - deve retornar category existente", async () => {
      const response = await request(app)
        .get(`/api/categories/${testCategoryId}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: testCategoryId,
        name: testCategoryData.name,
        description: testCategoryData.description,
      });
    });

    it("POST /api/categories - deve criar um novo category", async () => {
      const newRole = {
        name: "admin",
        description: "administrator",
      };

      const response = await request(app)
        .post("/api/categories")
        .send(newRole)
        .expect(201);

      expect(response.body).toMatchObject({
        name: newRole.name,
        description: newRole.description,
      });
    });
  });

  describe("Atualização de category", () => {
    it("PUT /api/categories/:id - deve atualizar um category existente", async () => {
      const updatedData = {
        description: "desc atualizada",
      };

      const response = await request(app)
        .put(`/api/categories/${testCategoryId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body).toMatchObject(updatedData);
    });

    it("PUT /api/categories/:id - deve retornar 400 para dados inválidos", async () => {
      await request(app)
        .put(`/api/categories/${testCategoryId}`)
        .send({ name: "" })
        .expect(422);
    });

    it("PUT /api/categories/:id - deve retornar 404 para category inexistente", async () => {
      await request(app)
        .put("/api/categories/99999")
        .send({ name: "Inexistente" })
        .expect(404);
    });
  });

  describe("Remoção e restauração de category", () => {
    let tempRoleId;

    beforeEach(async () => {
      // Cria um category temporário para cada teste
      const res = await request(app)
        .post("/api/categories")
        .send({
          name: `temp.${Date.now()}`,
          description: `temp.${Date.now()}`,
        });
      tempRoleId = res.body.id;
    });

    it("DELETE /api/categories/:id - deve remover um category (soft delete)", async () => {
      await request(app).delete(`/api/categories/${tempRoleId}`).expect(204);

      // Verifica soft delete diretamente no banco
      const deletedCategory = await sequelize.models.Category.findOne({
        where: { id: tempRoleId },
        paranoid: false,
      });
      expect(deletedCategory.deletedAt).not.toBeNull();
    });

    it("DELETE /api/categories/:id - deve retornar 404 para category já removido", async () => {
      // Primeiro remove
      await request(app).delete(`/api/categories/${tempRoleId}`).expect(204);

      // Tenta remover novamente
      await request(app).delete(`/api/categories/${tempRoleId}`).expect(404);
    });

    it("POST /api/categories/:id/restore - deve restaurar um category removido", async () => {
      // Primeiro remove
      await request(app).delete(`/api/categories/${tempRoleId}`).expect(204);

      // Restaura
      const restoreResponse = await request(app)
        .post(`/api/categories/${tempRoleId}/restore`)
        .expect(200);

      expect(restoreResponse.body.id).toBe(tempRoleId);
      expect(restoreResponse.body.password).toBeUndefined();

      // Verifica se está acessível
      await request(app).get(`/api/categories/${tempRoleId}`).expect(200);
    });

    it("POST /api/categories/:id/restore - deve retornar 404 para category inexistente", async () => {
      await request(app).post("/api/categories/99999/restore").expect(404);
    });
  });
});

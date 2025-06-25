/* eslint-disable no-undef */
const request = require("supertest");
const { sequelize } = require("../models");
const app = require("../app");

jest.setTimeout(10000);

describe("Testes de integração com banco de dados - Tags", () => {
  let testTagId;
  let testTagData;

  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    testTagData = {
      name: "educational-technology",
      description: "Technologies used in education",
    };

    const res = await request(app).post("/api/tags").send(testTagData);

    testTagId = res.body.id;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("Operações básicas de tag", () => {
    it("GET /api/tags - deve retornar lista de tags", async () => {
      const response = await request(app).get("/api/tags").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach((tag) => {
        expect(tag.password).toBeUndefined();
      });
    });

    it("GET /api/tags/:id - deve retornar 404 para tag inexistente", async () => {
      await request(app).get("/api/tags/99999").expect(404);
    });

    it("GET /api/tags/:id - deve retornar tag existente", async () => {
      const response = await request(app)
        .get(`/api/tags/${testTagId}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: testTagId,
        name: testTagData.name,
        description: testTagData.description,
      });
    });

    it("POST /api/tags - deve criar um novo tag", async () => {
      const newTag = {
        name: "stem-education",
        description: "Science, Technology, Engineering and Math education",
      };

      const response = await request(app)
        .post("/api/tags")
        .send(newTag)
        .expect(201);

      expect(response.body).toMatchObject({
        name: newTag.name,
        description: newTag.description,
      });
    });
  });

  describe("Atualização de tag", () => {
    it("PUT /api/tags/:id - deve atualizar um tag existente", async () => {
      const updatedData = {
        description: "Updated description for educational technology",
      };

      const response = await request(app)
        .put(`/api/tags/${testTagId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body).toMatchObject(updatedData);
    });

    it("PUT /api/tags/:id - deve retornar 400 para dados inválidos", async () => {
      await request(app)
        .put(`/api/tags/${testTagId}`)
        .send({ name: "" })
        .expect(422);
    });

    it("PUT /api/tags/:id - deve retornar 404 para tag inexistente", async () => {
      await request(app)
        .put("/api/tags/99999")
        .send({ name: "Non-existent-tag" })
        .expect(404);
    });
  });

  describe("Remoção e restauração de tag", () => {
    let tempTagId;

    beforeEach(async () => {
      // Cria um tag temporário para cada teste
      const res = await request(app)
        .post("/api/tags")
        .send({
          name: `temp-tag-${Date.now()}`,
          description: `Temporary tag ${Date.now()}`,
        });
      tempTagId = res.body.id;
    });

    it("DELETE /api/tags/:id - deve remover um tag (soft delete)", async () => {
      await request(app).delete(`/api/tags/${tempTagId}`).expect(204);

      // Verifica soft delete diretamente no banco
      const deletedTag = await sequelize.models.Tag.findOne({
        where: { id: tempTagId },
        paranoid: false,
      });
      expect(deletedTag.deletedAt).not.toBeNull();
    });

    it("DELETE /api/tags/:id - deve retornar 404 para tag já removido", async () => {
      // Primeiro remove
      await request(app).delete(`/api/tags/${tempTagId}`).expect(204);

      // Tenta remover novamente
      await request(app).delete(`/api/tags/${tempTagId}`).expect(404);
    });

    it("POST /api/tags/:id/restore - deve restaurar um tag removido", async () => {
      // Primeiro remove
      await request(app).delete(`/api/tags/${tempTagId}`).expect(204);

      // Restaura
      const restoreResponse = await request(app)
        .post(`/api/tags/${tempTagId}/restore`)
        .expect(200);

      expect(restoreResponse.body.id).toBe(tempTagId);
      expect(restoreResponse.body.password).toBeUndefined();

      // Verifica se está acessível
      await request(app).get(`/api/tags/${tempTagId}`).expect(200);
    });

    it("POST /api/tags/:id/restore - deve retornar 404 para tag inexistente", async () => {
      await request(app).post("/api/tags/99999/restore").expect(404);
    });
  });
});

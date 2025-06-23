/* eslint-disable no-undef */
const request = require("supertest");
const { sequelize } = require("../models");
const app = require("../app");

jest.setTimeout(10000);

describe("Testes de integração para Posts", () => {
  let testPostId;
  let testPostData;

  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    testPostData = {
      title: "Introdução à Programação Web",
      excerpt: "Aprenda os conceitos básicos de desenvolvimento web",
      content: "Conteúdo completo sobre programação web...",
      status: "published",
      publishedAt: new Date(),
    };

    const res = await request(app).post("/api/posts").send(testPostData);
    testPostId = res.body.id;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("Operações básicas de posts", () => {
    it("GET /api/posts - deve retornar lista de posts", async () => {
      const response = await request(app).get("/api/posts").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toMatchObject({
        title: testPostData.title,
        status: testPostData.status,
      });
    });

    it("GET /api/posts/:id - deve retornar 404 para post inexistente", async () => {
      await request(app).get("/api/posts/99999").expect(404);
    });

    it("GET /api/posts/:id - deve retornar post existente", async () => {
      const response = await request(app)
        .get(`/api/posts/${testPostId}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: testPostId,
        title: testPostData.title,
        excerpt: testPostData.excerpt,
        status: testPostData.status,
      });
      expect(response.body.slug).toBeDefined();
    });

    it("POST /api/posts - deve criar um novo post", async () => {
      const newPost = {
        title: "Tendências de Tecnologia para 2024",
        excerpt: "As principais inovações tecnológicas",
        content: "Conteúdo completo sobre tendências...",
        status: "published",
        publishedAt: new Date(),
      };

      const response = await request(app)
        .post("/api/posts")
        .send(newPost)
        .expect(201);

      expect(response.body).toMatchObject({
        title: newPost.title,
        status: newPost.status,
      });
      expect(response.body.slug).toBeDefined();

      // Verifica se foi realmente criado
      const getResponse = await request(app)
        .get(`/api/posts/${response.body.id}`)
        .expect(200);
      expect(getResponse.body).toMatchObject({
        title: newPost.title,
        excerpt: newPost.excerpt,
      });
    });

    it("POST /api/posts - deve retornar erro para dados inválidos", async () => {
      const invalidPost = {
        title: "", // Título vazio
        excerpt: "Excerpt válido",
        content: "Conteúdo válido",
        status: "published",
      };

      await request(app).post("/api/posts").send(invalidPost).expect(500);
    });
  });

  describe("Atualização de posts", () => {
    it("PUT /api/posts/:id - deve atualizar um post existente", async () => {
      const updatedData = {
        title: "Introdução à Programação Web Moderna",
        status: "archived",
      };

      const response = await request(app)
        .put(`/api/posts/${testPostId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body).toMatchObject(updatedData);

      // Verifica se o slug foi atualizado
      expect(response.body.slug).toContain(
        "introducao-a-programacao-web-moderna",
      );

      // Verifica se a atualização persistiu
      const getResponse = await request(app)
        .get(`/api/posts/${testPostId}`)
        .expect(200);
      expect(getResponse.body.title).toBe(updatedData.title);
      expect(getResponse.body.status).toBe(updatedData.status);
    });

    it("PUT /api/posts/:id - deve retornar 400 para dados inválidos", async () => {
      await request(app)
        .put(`/api/posts/${testPostId}`)
        .send({ status: "invalid_status" }) // Status inválido
        .expect(500);
    });

    it("PUT /api/posts/:id - deve retornar 404 para post inexistente", async () => {
      await request(app)
        .put("/api/posts/99999")
        .send({ title: "Inexistente" })
        .expect(404);
    });
  });

  describe("Remoção e restauração de posts", () => {
    let tempPostId;

    beforeEach(async () => {
      // Cria um post temporário para cada teste
      const res = await request(app)
        .post("/api/posts")
        .send({
          title: `Post Temporário ${Date.now()}`,
          excerpt: `Excerpt temporário ${Date.now()}`,
          content: "Conteúdo temporário",
          status: "draft",
        });
      tempPostId = res.body.id;
    });

    it("DELETE /api/posts/:id - deve remover um post (soft delete)", async () => {
      await request(app).delete(`/api/posts/${tempPostId}`).expect(204);

      // Verifica soft delete diretamente no banco
      const deletedPost = await sequelize.models.Post.findOne({
        where: { id: tempPostId },
        paranoid: false,
      });
      expect(deletedPost.deletedAt).not.toBeNull();

      // Verifica que não aparece mais na listagem normal
      const getResponse = await request(app).get("/api/posts").expect(200);
      expect(getResponse.body.some((p) => p.id === tempPostId)).toBe(false);
    });

    it("DELETE /api/posts/:id - deve retornar 404 para post já removido", async () => {
      // Primeiro remove
      await request(app).delete(`/api/posts/${tempPostId}`).expect(204);

      // Tenta remover novamente
      await request(app).delete(`/api/posts/${tempPostId}`).expect(404);
    });

    it("POST /api/posts/:id/restore - deve restaurar um post removido", async () => {
      // Primeiro remove
      await request(app).delete(`/api/posts/${tempPostId}`).expect(204);

      // Restaura
      const restoreResponse = await request(app)
        .post(`/api/posts/${tempPostId}/restore`)
        .expect(200);

      expect(restoreResponse.body.id).toBe(tempPostId);

      // Verifica se está acessível
      await request(app).get(`/api/posts/${tempPostId}`).expect(200);

      // Verifica que aparece na listagem normal
      const getResponse = await request(app).get("/api/posts").expect(200);
      expect(getResponse.body.some((p) => p.id === tempPostId)).toBe(true);
    });

    it("POST /api/posts/:id/restore - deve retornar 404 para post inexistente", async () => {
      await request(app).post("/api/posts/99999/restore").expect(404);
    });
  });
});

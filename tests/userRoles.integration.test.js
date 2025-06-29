/* eslint-disable no-undef */
const request = require("supertest");
const { sequelize } = require("../models");
const app = require("../app");

jest.setTimeout(10000);

describe("Testes de integração - UserRoles", () => {
  let testUserId;
  let testRoleId;

  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    // Cria um usuário de teste
    const userRes = await request(app).post("/api/users").send({
      username: "role.test.user",
      email: "role.test@example.com",
      password: "test123",
      firstName: "Role",
      lastName: "Test",
    });
    testUserId = userRes.body.id;

    // Cria uma role de teste
    const roleRes = await request(app).post("/api/roles").send({
      name: "test-role",
      description: "Role for testing purposes",
    });
    testRoleId = roleRes.body.id;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("Associação de roles a usuários", () => {
    it("POST /api/user-roles/:userId/:roleId - deve associar uma role a um usuário", async () => {
      const response = await request(app)
        .post(`/api/user-roles/${testUserId}/${testRoleId}`)
        .expect(201);

      // Correção: compara os valores convertidos para Number
      expect(Number(response.body.user_id)).toBe(testUserId);
      expect(Number(response.body.role_id)).toBe(testRoleId);
    });

    it("POST /api/user-roles/:userId/:roleId - deve retornar 400 para associação duplicada", async () => {
      await request(app)
        .post(`/api/user-roles/${testUserId}/${testRoleId}`)
        .expect(400);
    });

    it("POST /api/user-roles/:userId/:roleId - deve retornar 400 para usuário inexistente", async () => {
      await request(app).post("/api/user-roles/99999/1").expect(400);
    });

    it("POST /api/user-roles/:userId/:roleId - deve retornar 400 para role inexistente", async () => {
      await request(app)
        .post(`/api/user-roles/${testUserId}/99999`)
        .expect(400);
    });
  });

  describe("Listagem de associações", () => {
    it("GET /api/user-roles - deve listar todas as associações", async () => {
      const response = await request(app).get("/api/user-roles").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);

      // Verifica se a associação criada está na lista
      const hasAssociation = response.body.some(
        (assoc) =>
          Number(assoc.user_id) === testUserId &&
          Number(assoc.role_id) === testRoleId,
      );
      expect(hasAssociation).toBe(true);
    });

    it("GET /api/user-roles/user/:userId - deve listar roles de um usuário", async () => {
      const response = await request(app)
        .get(`/api/user-roles/user/${testUserId}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);

      // Correção: converte para Number antes de comparar
      const hasRole = response.body.some(
        (r) => Number(r.role_id) === testRoleId,
      );
      expect(hasRole).toBe(true);
    });

    it("GET /api/user-roles/role/:roleId - deve listar usuários de uma role", async () => {
      const response = await request(app)
        .get(`/api/user-roles/role/${testRoleId}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);

      // Correção: converte para Number antes de comparar
      const hasUser = response.body.some(
        (u) => Number(u.user_id) === testUserId,
      );
      expect(hasUser).toBe(true);
    });
  });

  describe("Remoção de associações", () => {
    it("DELETE /api/user-roles/:userId/:roleId - deve remover uma associação", async () => {
      // Cria uma nova associação para testar a remoção
      const newRoleRes = await request(app).post("/api/roles").send({
        name: "temp-role",
        description: "Temporary role",
      });
      const tempRoleId = newRoleRes.body.id;

      await request(app)
        .post(`/api/user-roles/${testUserId}/${tempRoleId}`)
        .expect(201);

      // Remove a associação
      await request(app)
        .delete(`/api/user-roles/${testUserId}/${tempRoleId}`)
        .expect(204);

      // Verifica se foi removido
      const checkRes = await request(app).get(
        `/api/user-roles/user/${testUserId}`,
      );

      const stillHasRole = checkRes.body.some(
        (r) => Number(r.role_id) === tempRoleId,
      );
      expect(stillHasRole).toBe(false);
    });

    it("DELETE /api/user-roles/:userId/:roleId - deve retornar 404 para associação inexistente", async () => {
      await request(app)
        .delete(`/api/user-roles/${testUserId}/99999`)
        .expect(404);
    });
  });
});

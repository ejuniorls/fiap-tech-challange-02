var express = require("express");
var router = express.Router();
const roleController = require("../controllers/roleController");

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Gerenciamento de roles
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Lista todos os roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles
 */
router.get("/", roleController.index);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Obtém um role pelo ID
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role encontrado
 *       404:
 *         description: Role não encontrado
 */
router.get("/:id", roleController.show);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Cria um novo role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Role criado
 */
router.post("/", roleController.store);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Atualiza um role
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role atualizado
 */
router.put("/:id", roleController.update);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Deleta um role
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Role deletado
 */
router.delete("/:id", roleController.destroy);

/**
 * @swagger
 * /roles/{id}/restore:
 *   post:
 *     summary: Restaura um role deletado (soft delete)
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role restaurado
 */
router.post("/:id/restore", roleController.restore);

module.exports = router;

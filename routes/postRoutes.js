var express = require("express");
var router = express.Router();
const postController = require("../controllers/postController");

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Gerenciamento de posts
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista todos os posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts
 */
router.get("/", postController.index);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obtém um post pelo ID
 *     tags: [Posts]
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
router.get("/:id", postController.show);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Posts]
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
router.post("/", postController.store);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post
 *     tags: [Posts]
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
router.put("/:id", postController.update);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Deleta um post
 *     tags: [Posts]
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
router.delete("/:id", postController.destroy);

/**
 * @swagger
 * /posts/{id}/restore:
 *   post:
 *     summary: Restaura um post deletado (soft delete)
 *     tags: [Posts]
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
router.post("/:id/restore", postController.restore);

module.exports = router;

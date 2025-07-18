var express = require("express");
var router = express.Router();
const categoryController = require("../controllers/category.controller");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gerenciamento de categorias
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Lista todos os categorias
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias
 */
router.get("/", categoryController.index);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtém um categoria pelo ID
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria encontrado
 *       404:
 *         description: Categoria não encontrado
 */
router.get("/:id", categoryController.show);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Cria um novo categoria
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criado
 */
router.post("/", categoryController.store);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Atualiza um categoria
 *     tags: [Categories]
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
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoria atualizado
 */
router.put("/:id", categoryController.update);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Deleta um categoria
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Categoria deletado
 */
router.delete("/:id", categoryController.destroy);

/**
 * @swagger
 * /categories/{id}/restore:
 *   post:
 *     summary: Restaura um categoria deletado (soft delete)
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria restaurado
 */
router.post("/:id/restore", categoryController.restore);

module.exports = router;

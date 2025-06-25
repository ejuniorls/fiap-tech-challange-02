var express = require("express");
var router = express.Router();
const tagController = require("../controllers/tagController");

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Gerenciamento de tags
 */

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Lista todos os tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Lista de tags
 */
router.get("/", tagController.index);

/**
 * @swagger
 * /tags/{id}:
 *   get:
 *     summary: Obtém um categoria pelo ID
 *     tags: [Tags]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tag encontrado
 *       404:
 *         description: Tag não encontrado
 */
router.get("/:id", tagController.show);

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Cria um novo categoria
 *     tags: [Tags]
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
 *         description: Tag criado
 */
router.post("/", tagController.store);

/**
 * @swagger
 * /tags/{id}:
 *   put:
 *     summary: Atualiza um categoria
 *     tags: [Tags]
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
 *         description: Tag atualizado
 */
router.put("/:id", tagController.update);

/**
 * @swagger
 * /tags/{id}:
 *   delete:
 *     summary: Deleta um categoria
 *     tags: [Tags]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tag deletado
 */
router.delete("/:id", tagController.destroy);

/**
 * @swagger
 * /tags/{id}/restore:
 *   post:
 *     summary: Restaura um categoria deletado (soft delete)
 *     tags: [Tags]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tag restaurado
 */
router.post("/:id/restore", tagController.restore);

module.exports = router;

var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require('../middlewares/auth.middleware');
const validateUser = require("../middlewares/validateUser");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Bearer token missing or invalid
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware.authenticate, userController.index);

/**
 * @swagger
 * /users/with-roles:
 *   get:
 *     summary: List all users with their roles
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users with their roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserWithRoles'
 *       401:
 *         description: Unauthorized - Bearer token missing or invalid
 *       500:
 *         description: Internal server error
 */
router.get("/with-roles", authMiddleware.authenticate, userController.listWithRoles);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Bearer token missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authMiddleware.authenticate, userController.show);

/**
 * @swagger
 * /users/{id}/with-roles:
 *   get:
 *     summary: Get a user with roles by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User with roles found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithRoles'
 *       401:
 *         description: Unauthorized - Bearer token missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id/with-roles", authMiddleware.authenticate, userController.showWithRoles);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Bearer token missing or invalid
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware.authenticate, validateUser, userController.store);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Bearer token missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authMiddleware.authenticate, validateUser, userController.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user (soft delete)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized - Bearer token missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware.authenticate, userController.destroy);

/**
 * @swagger
 * /users/{id}/restore:
 *   post:
 *     summary: Restore a soft-deleted user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User restored successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Bearer token missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/:id/restore", authMiddleware.authenticate, userController.restore);

module.exports = router;
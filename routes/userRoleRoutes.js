const express = require("express");
const router = express.Router();
const userRoleController = require("../controllers/userRoleController");

// Listar todas as relações
router.get("/", userRoleController.index);

// Listar relações por usuário
router.get("/user/:userId", userRoleController.showByUser);

// Listar relações por role
router.get("/role/:roleId", userRoleController.showByRole);

// Criar nova relação
router.post("/:userId/:roleId", userRoleController.store);

// Remover relação
router.delete("/:userId/:roleId", userRoleController.destroy);

module.exports = router;

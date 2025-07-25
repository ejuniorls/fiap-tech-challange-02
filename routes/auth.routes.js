const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/jwt-auth.middleware");

router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authMiddleware.authenticate, authController.logout);
router.get("/me", authMiddleware.authenticate, authController.me);

module.exports = router;

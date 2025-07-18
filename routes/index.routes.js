var express = require("express");
var router = express.Router();

const authRoutes = require("./auth.routes");
const categoryRoutes = require("./category.routes");
const postRoutes = require("./post.routes");
const rolesRoutes = require("./role.routes");
const tagRoutes = require("./tag.routes");
const userRoleRoutes = require("./user-role.routes");
const usersRoutes = require("./user.routes");
const versionRoutes = require("./version.routes");

/* GET home page. */
router.get("/", function (req, res) {
  res.status(200).json({ msg: "api blog educacional v0.1" });
});

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/posts", postRoutes);
router.use("/roles", rolesRoutes);
router.use("/tags", tagRoutes);
router.use("/user-roles", userRoleRoutes);
router.use("/users", usersRoutes);
router.use("/version", versionRoutes);

module.exports = router;

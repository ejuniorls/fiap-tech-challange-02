var express = require("express");
var router = express.Router();

const authRoutes = require("./authRoutes");
const categoryRoutes = require("./categoryRoutes");
const postRoutes = require("./postRoutes");
const rolesRoutes = require("./roleRoutes");
const tagRoutes = require("./tagRoutes");
const userRoleRoutes = require("./userRoleRoutes");
const usersRoutes = require("./userRoutes");
const versionRoutes = require("./versionRoutes");

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

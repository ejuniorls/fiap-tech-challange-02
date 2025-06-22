var express = require("express");
var router = express.Router();

const categoryRoutes = require("./categoryRoutes");
const rolesRoutes = require("./roleRoutes");
const usersRoutes = require("./userRoutes");
const versionRoutes = require("./versionRoutes");

/* GET home page. */
router.get("/", function (req, res) {
  res.status(200).json({ msg: "api blog educacional v0.1" });
});

router.use("/categories", categoryRoutes);
router.use("/roles", rolesRoutes);
router.use("/users", usersRoutes);
router.use("/version", versionRoutes);

module.exports = router;
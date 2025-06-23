var express = require("express");
var router = express.Router();

const categoryRoutes = require("./categoryRoutes");
const rolesRoutes = require("./roleRoutes");
<<<<<<< HEAD
const usersRoutes = require("./userRoutes");
=======
const postRoutes = require("./postRoutes");
>>>>>>> feature/post
const versionRoutes = require("./versionRoutes");

/* GET home page. */
router.get("/", function (req, res) {
  res.status(200).json({ msg: "api blog educacional v0.1" });
});

<<<<<<< HEAD
router.use("/categories", categoryRoutes);
=======
router.use("/users", usersRoutes);
router.use("/posts", postRoutes);
>>>>>>> feature/post
router.use("/roles", rolesRoutes);
router.use("/users", usersRoutes);
router.use("/version", versionRoutes);

module.exports = router;

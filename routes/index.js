var express = require("express");
var router = express.Router();

const usersRoutes = require("./userRoutes");
const versionRoutes = require("./versionRoutes");

/* GET home page. */
router.get("/", function (req, res) {
  res.status(200).json({ msg: "api blog educacional v0.1" });
});

router.use("/users", usersRoutes);
router.use("/version", versionRoutes);

module.exports = router;

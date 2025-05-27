var express = require("express");
var router = express.Router();

const usersRoutes = require("./users");

/* GET home page. */
router.get("/", function (req, res) {
  res.status(200).json({ msg: 'api blog educacional v0.1' });
});

router.use("/users", usersRoutes);

module.exports = router;

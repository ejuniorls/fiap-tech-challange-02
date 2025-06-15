var express = require("express");
var router = express.Router();
const versionController = require("../controllers/versionController");

router.get("/", versionController.getVersion);

module.exports = router;

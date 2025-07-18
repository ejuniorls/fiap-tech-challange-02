var express = require("express");
var router = express.Router();
const versionController = require("../controllers/version.controller");

router.get("/", versionController.getVersion);

module.exports = router;

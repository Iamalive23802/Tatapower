var express = require("express");
var router = express.Router();
var shiftactcontroller = require("../controllers/shiftactivities.controller");

router.route("/insertactivities").post(shiftactcontroller.insertactivities);
router.route("/getactivities").post(shiftactcontroller.getactivities);

module.exports = router;

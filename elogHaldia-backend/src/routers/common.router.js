var express = require("express");
var router = express.Router();
var commoncontroller = require("../controllers/common.controller");

router.route("/getallemployeesApi").post(commoncontroller.activeemployeelist);
// router.route("/emprole").post(commoncontroller.emprole);
router.route("/shiftdata").post(commoncontroller.shiftdata);
router.route("/shiftmanningdata").post(commoncontroller.shiftmanningdata);
router.route("/rolemenu").post(commoncontroller.rolemenu);

module.exports = router;

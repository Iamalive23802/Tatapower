const express = require("express");
const router = express.Router();

const formatcontroller = require("../controllers/format.controller");
const formatunit1controller = require("../controllers/formatunit1.controller");
const formatunit3controller = require("../controllers/formatunit3.controller");
const formattsiunit1controller = require("../controllers/formattsiunit1.controller");
const formattsiunit2controller = require("../controllers/formattsiunit2.controller");
const formattsiunit3controller = require("../controllers/formattsiunit3.controller");
const formatlssuaeqpController = require("../controllers/formatlssuaeqp.controller");
const formatisisController = require("../controllers/formatisis.controller");
const formatboilerLogsheetController = require("../controllers/formatboiler-logsheet.controller");
const formatBoilerDamperStatusController = require("../controllers/boilerdamperstatus.controller");
const formatBoilerHpdpAgitatorController = require("../controllers/boilerhpdpagitator.controller");
const formatBoilerIdfanStatusController = require("../controllers/boileridfanstatus.controller"); // ✅ NEW

// TG LSTG Unit 2
router.post("/inserttgdcslstgunit2", formatcontroller.inserttgdcslstgunit2);
router.post("/gettgdcslstgunit2", formatcontroller.gettgdcslstgunit2);

// TG LSTG Unit 1
router.post("/inserttgdcslstgunit1", formatunit1controller.inserttgdcslstgunit1);
router.post("/gettgdcslstgunit1", formatunit1controller.gettgdcslstgunit1);

// TG LSTG Unit 3
router.post("/inserttgdcslstgunit3", formatunit3controller.inserttgdcslstgunit3);
router.post("/gettgdcslstgunit3", formatunit3controller.gettgdcslstgunit3);

// TSI Unit 1
router.post("/inserttsiunit1", formattsiunit1controller.inserttsiunit1);
router.post("/gettsiunit1", formattsiunit1controller.gettsiunit1);

// TSI Unit 2
router.post("/inserttsiunit2", formattsiunit2controller.inserttsiunit2);
router.post("/gettsiunit2", formattsiunit2controller.gettsiunit2);

// TSI Unit 3
router.post("/inserttsiunit3", formattsiunit3controller.inserttsiunit3);
router.post("/gettsiunit3", formattsiunit3controller.gettsiunit3);

// Auxiliary Equipment Status
router.post("/inserthaldiaauxeqpmnt", formatlssuaeqpController.insertAuxEqp);
router.post("/gethaldiaauxeqpmnt", formatlssuaeqpController.getAuxEqp);

// Islanding
router.post("/insertlsislanding", formatisisController.insertIsisLanding);
router.post("/getlsislanding", formatisisController.getIsisLanding);

// Boiler logsheet
router.post("/insertboilerandbop", formatboilerLogsheetController.insertBoilerAndBop);
router.post("/getboilerandbop", formatboilerLogsheetController.getBoilerAndBop);

// Boiler Damper Status
router.post("/insertboilerdamperstatus", formatBoilerDamperStatusController.insertboilerdamperstatus);
router.post("/getboilerdamperstatus", formatBoilerDamperStatusController.getboilerdamperstatus);

// Boiler HPDP & Agitator Status
router.post("/insertboilerhpdpagitator", formatBoilerHpdpAgitatorController.insertboilerhpdpagitator);
router.post("/getboilerhpdpagitator", formatBoilerHpdpAgitatorController.getboilerhpdpagitator);

// Boiler ID Fan Status
router.post("/insertboileridfanstatus", formatBoilerIdfanStatusController.insertboileridfanstatus);
router.post("/getboileridfanstatus", formatBoilerIdfanStatusController.getboileridfanstatus);

module.exports = router;

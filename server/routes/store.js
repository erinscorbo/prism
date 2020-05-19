var express = require("express");
var router = express.Router();

var store_controller = require("../controllers/store");

// a simple test url to check that all of our files are communicating correctly.
router.get("/test", store_controller.test);

router.post("/create", store_controller.store_create);

router.get("/getstores", store_controller.store_getstores);

router.get("/:id", store_controller.store_details);

router.put("/:id/update", store_controller.store_update);

router.delete("/:id/delete", store_controller.store_delete);

module.exports = router;

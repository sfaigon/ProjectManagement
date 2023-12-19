const express = require("express");
const router = express.Router();
const tasksCtrl = require("../../controllers/api/tasks");

router.post("/", tasksCtrl.create);
router.get("/", tasksCtrl.index);
router.get("/:id", tasksCtrl.show);
router.get("/:id/edit", tasksCtrl.edit);
router.put("/:id", tasksCtrl.update);

module.exports = router;

const express = require("express");
const router = express.Router();
const tasksCtrl = require("../../controllers/api/tasks");

router.get("/", tasksCtrl.create);

module.exports = router;

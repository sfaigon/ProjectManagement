const express = require("express");
const router = express.Router();
const projectsCtrl = require("../../controllers/api/projects");

router.get("/", projectsCtrl.index);
router.post("/", projectsCtrl.create);
router.get("/:id", projectsCtrl.show);

module.exports = router;

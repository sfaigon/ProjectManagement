const express = require("express");
const router = express.Router();
const commentsCtrl = require("../../controllers/api/comments");


// will change once projects is done
router.get("/", commentsCtrl.index);
router.post("/", commentsCtrl.create);
router.get("/:id", commentsCtrl.show);
router.get("/:id/edit", commentsCtrl.edit);
router.put("/:id", commentsCtrl.update);
router.delete("/:id", commentsCtrl.delete);

module.exports = router;

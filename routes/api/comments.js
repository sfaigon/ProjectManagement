const express = require("express");
const router = express.Router();
const commentsCtrl = require("../../controllers/api/comments");


// will change once projects is done
router.get("/", commentsCtrl.index);
router.post("/", commentsCtrl.create);

module.exports = router;

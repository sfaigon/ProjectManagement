const Comment = require("../../models/comment");

module.exports = {
  create,
  index,
};

async function create(req, res) {
  try {
    const comment = await Comment.create(req.body);
    const allComments = await Comment.find({ project: req.body.project });
    res.json(allComments);
  } catch (err) {
    console.log(err);
  }
}

async function index(req, res) {
  try {
    const allComments = await Comment.find({ project: req.body.project });
    res.json(allComments);
  } catch (err) {
    console.log(err);
  }
}

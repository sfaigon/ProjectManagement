const Comment = require("../../models/comment");

module.exports = {
  create,
  index,
  // show,
};

async function create(req, res) {
  try {
    const comment = await Comment.create(req.body);
    await comment.save();
    return res.json(comment);
  } catch (err) {
    console.log(err);
  }
}

async function index(req, res) {
  try {
    // const allComments = await Comment.find({ project: req.body.project });
    const allComments = await Comment.find({});
    res.json(allComments);
  } catch (err) {
    console.log(err);
  }
}

const Comment = require("../../models/comment");

module.exports = {
  create,
  index,
  show,
  edit,
  update,
  deleteComment,


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

 
async function show(req, res) {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
  }

  return res.json(comment);
} catch (err) {
  console.error(err);
  return res.status(500).send({
      message: 'Internal server error',
  });
  }
}

async function edit(req, res) {
  try {
    const commentId = req.params.index;
    const updates = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    Object.assign(comment, updates);

    await comment.save();

    res.json(comment);
    } catch (err) {
    console.error('Error editing comment:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function update(req, res) {
  try {
    const commentId = req.params.id;
    const updates = req.body;

    const comment = await Comment.findByIdAndUpdate(commentId, updates, { new: true });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(comment);
  } catch (err) {
    console.error('Error updating comment:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

  
async function deleteComment(req, res) {
  try {
    const commentId = req.params.id;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
        return res.status(404).json({ message: 'Comment not found' });
    }

    res.json({ message: 'Comment deleted successfully', deletedComment });
  } catch (err) {
    console.error('Error deleting comment:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
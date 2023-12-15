const Task = require('../../models/task');

module.exports = {
    create,
  };

async function create(req, res) {
    const task = await new Task(req.body);
    task.userRecommending = req.user._id;
    task.save(function(err) {
      if (err) return res.redirect('/tasks')
      res.redirect(`/tasks/${task._id}`);
    });
  }
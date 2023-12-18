const Task = require('../../models/task');

module.exports = {
    create,
    index
  };

async function index(req,res) {
    try {
        const tasks = await Task.find({ userRecommending: req.user._id });
        res.render('/tasks', { tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
}
};

async function create(req, res) {
    const task = await new Task(req.body);
    task.userRecommending = req.user._id;
    task.save(function(err) {
      if (err) return res.redirect('/tasks')
      res.redirect(`/tasks/${task._id}`);
    });
  }
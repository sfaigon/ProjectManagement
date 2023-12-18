const Task = require('../../models/task');

module.exports = {
    create,
    index,
    show
  };

async function show(req, res) {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
  }

  return res.json(task);
} catch (err) {
  console.error(err);
  return res.status(500).send({
      message: 'Internal server error',
  });
  }
}

async function index(req,res) {
      const tasks = await Task.find({});
      res.json(tasks);
}
  

async function create(req, res) {
    try {
        const task = await new Task(req.body);
        await task.save();
        return res.json(task);
    } catch (err) {
        console.log(err);
        return res.status(400).send({
          message: "Validation failed",
        });
      }
  }
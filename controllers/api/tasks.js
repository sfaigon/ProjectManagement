const Task = require('../../models/task');

module.exports = {
    create,
    index,
    show, 
    edit,
    update,
    delete: deleteTask,
  };
  
  async function deleteTask(req, res) {
    try {
      const taskId = req.params.id;

      const deletedTask = await Task.findByIdAndDelete(taskId);

      if (!deletedTask) {
          return res.status(404).json({ message: 'Task not found' });
      }

      res.json({ message: 'Task deleted successfully', deletedTask });
    } catch (err) {
      console.error('Error deleting task:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async function update(req, res) {
    try {
      const taskId = req.params.id;
      const updates = req.body;

      const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.json(task);
    } catch (err) {
      console.error('Error updating task:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  async function edit(req, res) {
    try {
      const taskId = req.params.index;
      const updates = req.body;
  
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      Object.assign(task, updates);
  
      await task.save();
  
      res.json(task);
      } catch (err) {
      console.error('Error editing task:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
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
    console.log(req.body);
    try {
        const task = await Task.create(req.body);
        await task.save();
        return res.json(task);
    } catch (err) {
        console.log(err);
        return res.status(400).send({
          message: "Validation failed",
        });
      }
  }
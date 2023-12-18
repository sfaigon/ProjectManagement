const Task = require('../../models/task');

module.exports = {
    create,
    index
  };

async function index(req,res) {
    try {
        const tasks = await Task.find({});
        res.render('/tasks', { tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
}
};

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
const Task = require('../../models/task');

module.exports = {
    create,
    index
  };

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
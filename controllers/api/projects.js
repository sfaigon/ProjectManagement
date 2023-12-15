const Project = require("../../models/Project");

module.exports = {
  index,
  show,
};

async function index(req, res) {
  const projects = await Project.find({}).sort("name").populate().exec();
  projects.sort((a, b) => a.dateCreated.sortOrder - b.dateCreated.sortOrder);
  res.json(projects);
}

async function show(req, res) {
  const project = await Project.findById(req.params.id);
  res.json(project);
}

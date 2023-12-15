const Project = require("../../models/Project");

module.exports = {
  index,
  show,
  create,
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

async function create(req, res) {
  const { project: projectText, name } = req.body;
  const project = new Project({
    name: projectText,
    dateCreated: Date,
    teamMembers: [],
  });
}

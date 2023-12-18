const Project = require("../../models/Project");

module.exports = {
  index,
  show,
  create,
};

async function index(req, res) {
  const projects = await Project.find({});
  projects.sort((a, b) => a.dateCreated.sortOrder - b.dateCreated.sortOrder);
  res.json(projects);
}

async function show(req, res) {
  console.log("route triggered");
  const projectId = await Project.findById(req.params.id);
  console.log("Project ID:", projectId);
  res.json(projectId);
}

async function create(req, res) {
  try {
    const { name, dateCreated } = req.body;
    const project = new Project({
      name,
      dateCreated,
      teamMembers: [],
    });
    await project.save();
    return res.json(project);
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      message: "Validation failed",
    });
  }
}

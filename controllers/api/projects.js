const Project = require("../../models/Project");

module.exports = {
  index,
  show,
  create,
  update,
  edit,
  delete: deleteProject,
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

async function update(req, res) {
  try {
    const projectId = req.params.id;
    const updates = req.body;

    const project = await Project.findByIdAndUpdate(projectId, updates, {
      new: true,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    console.error("Error updating project:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
async function edit(res, req) {
  try {
    const projectId = req.params.index;
    const updates = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    Object.assign(project, updates);

    await project.save();

    res.json(project);
  } catch (err) {
    console.error("Error editing project:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteProject(req, res) {
  try {
    const projectId = req.params.id;

    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully", deletedProject });
  } catch (err) {
    console.error("Error deleting project:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

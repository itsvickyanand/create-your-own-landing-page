const Project = require("../models/Project");

// CREATE
exports.create = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET ALL (by organization)
exports.getAll = async (req, res) => {
  try {
    const { organizationId } = req.query;
    const projects = await Project.findAll({
      where: organizationId ? { organizationId } : {},
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
exports.getOne = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    await project.update(req.body);
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    await project.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

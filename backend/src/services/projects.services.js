const Project = require("../models/Project");

exports.create = (data) => {
  return Project.create(data);
};

exports.getAll = (organizationId) => {
  return Project.findAll({
    where: organizationId ? { organizationId } : {},
  });
};

exports.getOne = (id) => {
  return Project.findByPk(id);
};

exports.update = async (id, data) => {
  const project = await Project.findByPk(id);
  if (!project) throw new Error("Project not found");
  return project.update(data);
};

exports.remove = async (id) => {
  const project = await Project.findByPk(id);
  if (!project) throw new Error("Project not found");
  return project.destroy();
};

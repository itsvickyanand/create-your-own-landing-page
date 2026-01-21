const Component = require("../models/Component");

exports.create = (data) => {
  return Component.create(data);
};

exports.getAll = (pageId) => {
  return Component.findAll({
    where: pageId ? { pageId } : {},
    order: [["position", "ASC"]],
  });
};

exports.getOne = (id) => {
  return Component.findByPk(id);
};

exports.update = async (id, data) => {
  const component = await Component.findByPk(id);
  if (!component) throw new Error("Component not found");
  return component.update(data);
};

exports.remove = async (id) => {
  const component = await Component.findByPk(id);
  if (!component) throw new Error("Component not found");
  return component.destroy();
};

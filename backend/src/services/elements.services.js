const Element = require("../models/Element");

exports.create = (data) => {
  return Element.create(data);
};

exports.getAll = (componentId) => {
  return Element.findAll({
    where: componentId ? { componentId } : {},
    order: [["position", "ASC"]],
  });
};

exports.getOne = (id) => {
  return Element.findByPk(id);
};

exports.update = async (id, data) => {
  const element = await Element.findByPk(id);
  if (!element) throw new Error("Element not found");
  return element.update(data);
};

exports.remove = async (id) => {
  const element = await Element.findByPk(id);
  if (!element) throw new Error("Element not found");
  return element.destroy();
};

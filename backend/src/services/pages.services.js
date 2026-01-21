const Page = require("../models/Page");

exports.create = (data) => {
  return Page.create(data);
};

exports.getAll = (projectId) => {
  return Page.findAll({
    where: projectId ? { projectId } : {},
  });
};

exports.getOne = (id) => {
  return Page.findByPk(id);
};

exports.update = async (id, data) => {
  const page = await Page.findByPk(id);
  if (!page) throw new Error("Page not found");
  return page.update(data);
};

exports.remove = async (id) => {
  const page = await Page.findByPk(id);
  if (!page) throw new Error("Page not found");
  return page.destroy();
};

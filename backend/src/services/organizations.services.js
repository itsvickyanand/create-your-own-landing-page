const Organization = require("../models/Organization");

exports.create = (data) => {
  return Organization.create(data);
};

exports.getAll = () => {
  return Organization.findAll();
};

exports.getOne = (id) => {
  return Organization.findByPk(id);
};

exports.update = async (id, data) => {
  const org = await Organization.findByPk(id);
  if (!org) throw new Error("Organization not found");
  return org.update(data);
};

exports.remove = async (id) => {
  const org = await Organization.findByPk(id);
  if (!org) throw new Error("Organization not found");
  return org.destroy();
};

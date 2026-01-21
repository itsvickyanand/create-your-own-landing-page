const Organization = require("../models/Organization");

// CREATE
exports.create = async (req, res) => {
  try {
    const org = await Organization.create(req.body);
    res.status(201).json(org);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const orgs = await Organization.findAll();
    res.json(orgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
exports.getOne = async (req, res) => {
  try {
    const org = await Organization.findByPk(req.params.id);
    if (!org)
      return res.status(404).json({ message: "Organization not found" });
    res.json(org);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const org = await Organization.findByPk(req.params.id);
    if (!org)
      return res.status(404).json({ message: "Organization not found" });

    await org.update(req.body);
    res.json(org);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const org = await Organization.findByPk(req.params.id);
    if (!org)
      return res.status(404).json({ message: "Organization not found" });

    await org.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

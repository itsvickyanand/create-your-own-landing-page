const Component = require("../models/Component");

// CREATE
exports.create = async (req, res) => {
  try {
    const component = await Component.create(req.body);
    res.status(201).json(component);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET ALL (by page)
exports.getAll = async (req, res) => {
  try {
    const { pageId } = req.query;
    const components = await Component.findAll({
      where: pageId ? { pageId } : {},
      order: [["position", "ASC"]],
    });
    res.json(components);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
exports.getOne = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component)
      return res.status(404).json({ message: "Component not found" });
    res.json(component);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component)
      return res.status(404).json({ message: "Component not found" });

    await component.update(req.body);
    res.json(component);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component)
      return res.status(404).json({ message: "Component not found" });

    await component.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

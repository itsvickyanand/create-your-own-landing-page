const Element = require("../models/Element");

// CREATE
exports.create = async (req, res) => {
  try {
    const element = await Element.create(req.body);
    res.status(201).json(element);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET ALL (by component)
exports.getAll = async (req, res) => {
  try {
    const { componentId } = req.query;
    const elements = await Element.findAll({
      where: componentId ? { componentId } : {},
      order: [["position", "ASC"]],
    });
    res.json(elements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
exports.getOne = async (req, res) => {
  try {
    const element = await Element.findByPk(req.params.id);
    if (!element) return res.status(404).json({ message: "Element not found" });
    res.json(element);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const element = await Element.findByPk(req.params.id);
    if (!element) return res.status(404).json({ message: "Element not found" });

    await element.update(req.body);
    res.json(element);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const element = await Element.findByPk(req.params.id);
    if (!element) return res.status(404).json({ message: "Element not found" });

    await element.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

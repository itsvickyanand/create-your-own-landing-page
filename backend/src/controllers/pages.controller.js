const Page = require("../models/Page");

// CREATE
exports.create = async (req, res) => {
  try {
    const page = await Page.create(req.body);
    res.status(201).json(page);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET ALL (by project)
exports.getAll = async (req, res) => {
  try {
    const { projectId } = req.query;
    const pages = await Page.findAll({
      where: projectId ? { projectId } : {},
    });
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
exports.getOne = async (req, res) => {
  try {
    const page = await Page.findByPk(req.params.id);
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json(page);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const page = await Page.findByPk(req.params.id);
    if (!page) return res.status(404).json({ message: "Page not found" });

    await page.update(req.body);
    res.json(page);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const page = await Page.findByPk(req.params.id);
    if (!page) return res.status(404).json({ message: "Page not found" });

    await page.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

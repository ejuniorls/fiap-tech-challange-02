const tagService = require("../services/tagService");

module.exports = {
  async index(req, res) {
    const tags = await tagService.findAll();
    res.json(tags);
  },

  async show(req, res) {
    const tag = await tagService.findById(req.params.id);
    if (!tag) return res.status(404).json({ error: "Category not found" });
    res.json(tag);
  },

  async store(req, res, next) {
    try {
      const tag = await tagService.create(req.body);
      res.status(201).json(tag);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const tag = await tagService.update(req.params.id, req.body);
      res.json(tag);
    } catch (error) {
      next(error);
    }
  },

  async destroy(req, res) {
    try {
      await tagService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async restore(req, res) {
    try {
      const tag = await tagService.restore(req.params.id);
      return res.json(tag);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },
};

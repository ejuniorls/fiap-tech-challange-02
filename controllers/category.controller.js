const categoryService = require("../services/category.service");

module.exports = {
  async index(req, res) {
    const categories = await categoryService.findAll();
    res.json(categories);
  },

  async show(req, res) {
    const category = await categoryService.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  },

  async store(req, res, next) {
    try {
      const category = await categoryService.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const category = await categoryService.update(req.params.id, req.body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },

  async destroy(req, res) {
    try {
      await categoryService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async restore(req, res) {
    try {
      const category = await categoryService.restore(req.params.id);
      return res.json(category);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },
};

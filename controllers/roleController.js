const roleService = require("../services/roleService");

module.exports = {
  async index(req, res) {
    const roles = await roleService.findAll();
    res.json(roles);
  },

  async show(req, res) {
    const role = await roleService.findById(req.params.id);
    if (!role) return res.status(404).json({ error: "Role não encontrado" });
    res.json(role);
  },

  async store(req, res, next) {
    try {
      const role = await roleService.create(req.body);
      res.status(201).json(role);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const role = await roleService.update(req.params.id, req.body);
      res.json(role);
    } catch (error) {
      next(error);
    }
  },

  async destroy(req, res) {
    try {
      await roleService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async restore(req, res) {
    try {
      const role = await roleService.restore(req.params.id);
      return res.json(role);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },
};

const userService = require("../services/userService");

module.exports = {
  async index(req, res) {
    const users = await userService.findAll();
    res.json(users);
  },

  async show(req, res) {
    const user = await userService.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(user);
  },

  async store(req, res, next) {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const user = await userService.update(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async destroy(req, res) {
    try {
      await userService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async restore(req, res) {
    try {
      const user = await userService.restore(req.params.id);
      return res.json(user);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async listWithRoles(req, res, next) {
    try {
      const users = await userService.findAllWithRoles();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  async showWithRoles(req, res, next) {
    try {
      const user = await userService.findByIdWithRoles(req.params.id);
      if (!user)
        return res.status(404).json({ error: "Usuário não encontrado" });
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
};

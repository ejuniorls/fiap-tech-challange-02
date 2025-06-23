const postService = require("../services/postService");

module.exports = {
  async index(req, res) {
    const posts = await postService.findAll();
    res.json(posts);
  },

  async show(req, res) {
    const post = await postService.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post não encontrado" });
    res.json(post);
  },

  async store(req, res, next) {
    try {
      const post = await postService.create(req.body);
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const post = await postService.update(req.params.id, req.body);
      res.json(post);
    } catch (error) {
      next(error);
    }
  },

  async destroy(req, res) {
    try {
      await postService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async restore(req, res) {
    try {
      const post = await postService.restore(req.params.id);
      return res.json(post);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },
};

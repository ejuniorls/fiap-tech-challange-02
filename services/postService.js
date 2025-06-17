const { Post } = require("../models");

class PostService {
  async create(data) {
    return await Post.create(data);
  }

  async findAll() {
    return await Post.findAll();
  }

  async findById(id) {
    return await Post.findByPk(id);
  }

  async update(id, data) {
    const post = await Post.findByPk(id);
    if (!post) {
      const notFoundError = new Error("Post não encontrado");
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    return await post.update(data);
  }

  async delete(id) {
    const post = await Post.findByPk(id);
    if (!post) throw new Error("Post não encontrado");
    return await post.destroy(); // soft delete
  }

  async restore(id) {
    const post = await Post.findByPk(id, { paranoid: false }); // busca mesmo os deletados
    if (!post) throw new Error("Post não encontrado");
    return await post.restore();
  }
}

module.exports = new PostService();

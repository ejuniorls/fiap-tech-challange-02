const { Post } = require("../models");
const { generateUniqueSlug } = require("../utils/slug");
const BaseService = require("./BaseService");

class PostService extends BaseService {
  constructor() {
    super(Post);
  }

  async create(data) {
    data.slug = await generateUniqueSlug(Post, data.title);
    return super.create(data);
  }

  async update(id, data) {
    if (data.title) {
      data.slug = await generateUniqueSlug(Post, data.title);
    }
    return super.update(id, data);
  }
}

module.exports = new PostService();

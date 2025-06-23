const { Category } = require("../models");
const { generateUniqueSlug } = require("../utils/slug");
const BaseService = require("./BaseService");

class CategoryService extends BaseService {
  constructor() {
    super(Category);
  }

  async create(data) {
    // Gera o slug único a partir do nome
    data.slug = await generateUniqueSlug(Category, data.name);
    return super.create(data);
  }

  async update(id, data) {
    // Atualiza apenas o slug se o nome foi modificado
    if (data.name) {
      data.slug = await generateUniqueSlug(Category, data.name);
    }
    return super.update(id, data);
  }
}
module.exports = new CategoryService();

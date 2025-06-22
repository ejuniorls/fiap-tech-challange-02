const { Category } = require("../models");
const { generateUniqueSlug } = require("../utils/slug");

class CategoryService {
  async create(data) {
    // Gera o slug único a partir do nome
    data.slug = await generateUniqueSlug(Category, data.name);

    return await Category.create(data);
  }

  async findAll() {
    return await Category.findAll();
  }

  async findById(id) {
    return await Category.findByPk(id);
  }

  async update(id, data) {
    const category = await Category.findByPk(id);
    if (!category) {
      const notFoundError = new Error("Categoria não encontrada");
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    // Atualiza apenas o slug se o username foi modificado
    if (data.name) {
      data.slug = await generateUniqueSlug(Category, data.name);
    }

    return await category.update(data);
  }

  async delete(id) {
    const category = await Category.findByPk(id);
    if (!category) throw new Error("Categoria não encontrada");
    return await category.destroy(); // soft delete
  }

  async restore(id) {
    const category = await Category.findByPk(id, { paranoid: false }); // busca mesmo os deletados
    if (!category) throw new Error("Categoria não encontrada");
    return await category.restore();
  }
}

module.exports = new CategoryService();

const { Tag } = require("../models");
const { generateUniqueSlug } = require("../utils/slug-generator.util");
const BaseService = require("./base.service");

class TagService extends BaseService {
  constructor() {
    super(Tag);
  }

  async create(data) {
    // Gera o slug único a partir do nome
    data.slug = await generateUniqueSlug(Tag, data.name);
    return super.create(data);
  }

  async update(id, data) {
    // Atualiza apenas o slug se o nome foi modificado
    if (data.name) {
      data.slug = await generateUniqueSlug(Tag, data.name);
    }
    return super.update(id, data);
  }
}
module.exports = new TagService();

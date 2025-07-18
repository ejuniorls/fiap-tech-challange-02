const slugify = require("slugify");

/**
 * Gera um slug simples a partir de uma string
 */
function generateSlug(text) {
  if (!text || typeof text !== "string") {
    throw new Error("Parâmetro inválido para slug");
  }

  return slugify(text, {
    lower: true,
    strict: true, // remove caracteres especiais
    locale: "pt",
  });
}

/**
 * Gera um slug único para um model Sequelize baseado em um campo de texto
 * @param {Model} model - Model Sequelize (ex: User, Post)
 * @param {string} text - Texto base para o slug (ex: nome, título)
 * @param {string} field - Nome do campo slug na tabela (padrão: "slug")
 */
async function generateUniqueSlug(model, text, field = "slug") {
  const baseSlug = generateSlug(text);
  let slug = baseSlug;
  let count = 1;

  const where = {};
  where[field] = slug;

  while (await model.findOne({ where })) {
    slug = `${baseSlug}-${count}`;
    where[field] = slug;
    count++;
  }

  return slug;
}

module.exports = {
  generateSlug,
  generateUniqueSlug,
};

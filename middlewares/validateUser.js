// middlewares/validateUser.js
module.exports = (req, res, next) => {
  const { method, body } = req;

  // Validações para criação (POST)
  if (method === "POST") {
    const requiredFields = [
      "username",
      "email",
      "password",
      "firstName",
      "lastName",
    ];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Campos obrigatórios faltando: ${missingFields.join(", ")}`,
      });
    }
  }

  // Validações para atualização (PUT/PATCH)
  if (["PUT", "PATCH"].includes(method)) {
    const validationRules = {
      username: (value) => {
        if (value !== undefined && !value) return "username não pode ser vazio";
        if (value && value.length < 3)
          return "username deve ter pelo menos 3 caracteres";
        return null;
      },
      email: (value) => {
        if (value !== undefined && !value) return "email não pode ser vazio";
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "email inválido";
        return null;
      },
      // Adicione outras validações conforme necessário
    };

    const errors = [];

    for (const [field, validate] of Object.entries(validationRules)) {
      if (body[field] !== undefined) {
        const error = validate(body[field]);
        if (error) errors.push({ field, message: error });
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: "Erro de validação",
        details: errors,
      });
    }
  }

  next();
};

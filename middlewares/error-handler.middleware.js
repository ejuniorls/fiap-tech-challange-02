/* eslint-disable no-unused-vars */
const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports = (error, req, res, next) => {
  // console.error("Error:", error.statusCode);

  // Erros conhecidos do Sequelize
  if (error instanceof UniqueConstraintError) {
    return res.status(409).json({
      success: false,
      error: {
        message: error.errors[0].message,
        field: error.errors[0].path,
        type: "UNIQUE_VIOLATION",
        code: "CONFLICT",
      },
    });
  }

  if (error instanceof ValidationError) {
    return res.status(422).json({
      success: false,
      error: {
        message: "Erro de validação",
        details: error.errors.map((err) => ({
          field: err.path,
          message: err.message,
          type: err.type,
          value: err.value,
        })),
        type: "VALIDATION_ERROR",
        code: "UNPROCESSABLE_ENTITY",
      },
    });
  }

  // Erros customizados (como 404)
  if (error.statusCode) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        type: error.type || "CUSTOM_ERROR",
        code: error.code || "UNKNOWN",
      },
    });
  }

  // Erro genérico
  return res.status(500).json({
    success: false,
    error: {
      message: "Erro interno no servidor",
      type: "SERVER_ERROR",
      code: "INTERNAL_SERVER_ERROR",
      ...(process.env.NODE_ENV === "development" && {
        stack: error.stack,
      }),
    },
  });
};

const swaggerJSDoc = require("swagger-jsdoc");
const pkg = require("../package.json");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: pkg.name,
      version: pkg.version,
      description: pkg.description,
    },
    servers: [
      {
        url: "http://localhost:3000", // ajuste conforme seu ambiente
      },
    ],
  },
  apis: ["./routes/*.js"], // Caminho onde estão suas rotas documentadas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

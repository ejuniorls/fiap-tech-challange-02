const swaggerJSDoc = require("swagger-jsdoc");
const pkg = require("../package.json");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: pkg.name,
      version: pkg.version,
      description: pkg.description,
      contact: {
        name: "Seu Nome ou Empresa",
        url: "https://seusite.com",
        email: "seuemail@dominio.com"
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT"
      },
      termsOfService: "https://seusite.com/termos"
    },
    externalDocs: {
      description: "Exportar para Postman",
      url: "/api-docs.json" // Este é o endpoint que o Postman pode importar
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Ambiente local"
      },
      {
        url: "https://api.seusite.com",
        description: "Ambiente de produção"
      }
    ],
    tags: [
      {
        name: "Auth",
        description: "Operações de autenticação"
      },
      {
        name: "Categories",
        description: "Operações relacionadas a usuários"
      },
      {
        name: "Posts",
        description: "Operações relacionadas a usuários"
      },
      {
        name: "Roles",
        description: "Operações relacionadas a usuários"
      },
      {
        name: "Tags",
        description: "Operações relacionadas a usuários"
      },
      {
        name: "Users",
        description: "Operações relacionadas a usuários"
      },
      {
        name: "User Roles",
        description: "Operações relacionadas a usuários"
      },
      {
        name: "Version",
        description: "Operações relacionadas a usuários"
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Swagger (apenas em desenvolvimento)
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

// Middleware de erro
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Configurações básicas
app.use([
  logger(process.env.NODE_ENV === "production" ? "combined" : "dev"),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
  express.static(path.join(__dirname, "public")),
]);

// Swagger apenas em desenvolvimento
if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// Rotas
const routes = require("./routes");
app.use("/api", routes);

// JSON cru para importar no Postman
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});


// Middleware de erro
app.use(errorHandler);

// Exporta o app sem iniciar o servidor (para testes)
module.exports = app;

// Inicia o servidor apenas quando não for teste
if (process.env.NODE_ENV !== "test" && require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Ambiente: ${process.env.NODE_ENV || "development"}`);
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Banco de dados: ${process.env.DB_NAME}`);
  });
}

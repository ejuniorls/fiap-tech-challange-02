// Determina o ambiente atual (padrão para 'development' se não especificado)
const env = process.env.NODE_ENV || "development";

// Carrega as variáveis de ambiente do arquivo correto
require("dotenv").config({
  path: `.env.${env}`,
});

// Validação das variáveis de ambiente essenciais
const requiredEnvVars = ["DB_USER", "DB_PASS", "DB_HOST", "DB_NAME"];
if (env === "production") {
  requiredEnvVars.push("DB_NAME_PROD");
}

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`❌ Variável de ambiente faltando: ${varName}`);
    process.exit(1);
  }
});

// Configuração para cada ambiente
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: console.log, // Mostra queries SQL no console
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Silencia logs durante testes
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    pool: {
      // Configurações adicionais para produção
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};

// Log informativo (opcional)
console.log(`\n⚙️  Ambiente carregado: ${env}`);
console.log(`📦 Database: ${module.exports[env].database}`);
console.log(`🌐 Host: ${module.exports[env].host}\n`);

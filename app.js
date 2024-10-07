var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const connectDB = require('./config/db');
const routes = require('./routes'); // Importando as rotas centralizadas

// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// // Configurações do Swagger
// const swaggerOptions = {
//     swaggerDefinition: {
//         openapi: '3.1.0',
//         info: {
//             title: 'API de Posts',
//             version: '1.0.0',
//             description: 'API para gerenciar posts e autores',
//         },
//         servers: [
//             {
//                 url: 'http://localhost:3000',
//             },
//         ],
//     },
//     apis: ['./controllers/*.js'], // Caminho dos arquivos de documentação
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);

var app = express();

// Conectar ao banco de dados
connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// // Rota para acessar a documentação em JSON
// app.get('/swagger.json', (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(swaggerDocs);
// });

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(routes); // Usando as rotas centralizadas

module.exports = app;

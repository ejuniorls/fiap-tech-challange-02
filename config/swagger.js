const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuração das opções do swagger-jsdoc
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API - Tech Challenge Fase 02',
            version: '1.0.0',
            description: 'Documentação da API gerada pelo Swagger',
        },
        externalDocs: {
            description: 'Exportar JSON',
            url: 'http://localhost:3000/doc/tech_challenge.json'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desenvolvimento',
            },
        ],
    },
    apis: ['./controllers/*.js'], // Caminho para os arquivos que contêm as rotas e documentação
};

// Inicializa o swagger-jsdoc com as opções
const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
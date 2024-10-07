const express = require('express');
const router = express.Router();
const { swaggerUi, swaggerSpec } = require('../config/swagger');

// Configuração da rota para o Swagger UI
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota para obter o JSON da documentação
router.get('/tech_challenge.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

module.exports = router;
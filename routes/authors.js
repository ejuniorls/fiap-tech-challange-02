const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Rota para criar um autor
router.post('/', authorController.createAuthor);

// Rota para listar todos os autores
router.get('/', authorController.getAuthors);

// Rota para obter um autor pelo ID
router.get('/:id', authorController.getAuthorById);

// Rota para atualizar um autor
router.put('/:id', authorController.updateAuthor);

// Rota para deletar um autor
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;

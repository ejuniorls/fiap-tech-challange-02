const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Rota para criar um post
router.post('/', postController.createPost);

// Rota para listar todos os posts
router.get('/', postController.getPosts);

// Rota para obter um post pelo ID
router.get('/:id', postController.getPostById);

// Rota para atualizar um post
router.put('/:id', postController.updatePost);

// Rota para deletar um post
router.delete('/:id', postController.deletePost);

module.exports = router;

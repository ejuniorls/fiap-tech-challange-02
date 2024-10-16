var express = require('express');
var router = express.Router();

const authorsRouter = require('./authors');
const postsRouter = require('./posts');
const swaggerRouter = require('./swagger');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Rotas do Swagger UI
router.use('/doc', swaggerRouter);

// Rotas de autores
router.use('/api/autores', authorsRouter);

// Rotas de posts
router.use('/api/posts', postsRouter);

module.exports = router;

const Post = require('../models/Post');

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Criar um novo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       400:
 *         description: Erro na criação do post
 */
exports.createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(400).send(error);
    }
};

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Listar todos os posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   author:
 *                     type: string
 *       500:
 *         description: Erro ao listar posts
 */
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author');
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
};

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obter um post pelo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes do post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 author:
 *                   type: string
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro ao obter post
 */
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author');
        if (!post) {
            return res.status(404).send({ message: 'Post não encontrado' });
        }
        res.send(post);
    } catch (error) {
        res.status(500).send(error);
    }
};

/**
 * @swagger
 * /posts/search/{word}:
 *   get:
 *     summary: Obter posts por busca por palavra
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: word
 *         required: true
 *         description: busca por palavra
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes do post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 author:
 *                   type: string
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro ao obter post
 */
exports.searchPost = async (req, res) => {
    try {
        const posts = await Post.find({
            $or: [
                { title: { $regex: req.params.word, $options: 'i' } },
                { content: { $regex: req.params.word, $options: 'i' } }
            ]
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualizar um post pelo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       404:
 *         description: Post não encontrado
 *       400:
 *         description: Erro na atualização do post
 */
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).send({ message: 'Post não encontrado' });
        }
        res.send(post);
    } catch (error) {
        res.status(400).send(error);
    }
};

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Deletar um post pelo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deletado com sucesso
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro ao deletar post
 */
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).send({ message: 'Post não encontrado' });
        }
        res.send({ message: 'Post deletado com sucesso' });
    } catch (error) {
        res.status(500).send(error);
    }
};

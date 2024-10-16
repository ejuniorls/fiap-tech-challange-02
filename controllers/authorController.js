const Author = require('../models/Author');

/**
 * @swagger
 * /api/autores:
 *   post:
 *     summary: Criar um novo autor
 *     tags: [Autores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Autor criado com sucesso
 *       400:
 *         description: Erro na criação do autor
 */
exports.createAuthor = async (req, res) => {
    try {
        const author = new Author(req.body);
        await author.save();
        res.status(201).send(author);
    } catch (error) {
        res.status(400).send(error);
    }
};

/**
 * @swagger
 * /api/autores:
 *   get:
 *     summary: Listar todos os autores
 *     tags: [Autores]
 *     responses:
 *       200:
 *         description: Lista de autores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *       500:
 *         description: Erro ao listar autores
 */
exports.getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.send(authors);
    } catch (error) {
        res.status(500).send(error);
    }
};

/**
 * @swagger
 * /api/autores/{id}:
 *   get:
 *     summary: Obter um autor pelo ID
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do autor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes do autor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: Autor não encontrado
 *       500:
 *         description: Erro ao obter autor
 */
exports.getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).send({ message: 'Autor não encontrado' });
        }
        res.send(author);
    } catch (error) {
        res.status(500).send(error);
    }
};

/**
 * @swagger
 * /api/autores/busca/{palavra}:
 *   get:
 *     summary: Obter autores por busca por palavra
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: palavra
 *         required: true
 *         description: busca por palavra
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes do autor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: Autor não encontrado
 *       500:
 *         description: Erro ao obter autor
 */
exports.searchAuthor = async (req, res) => {
    try {
        const authors = await Author.find({
            $or: [
                { name: { $regex: req.params.palavra, $options: 'i' } },
                { email: { $regex: req.params.palavra, $options: 'i' } }
            ]
        });
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/autores/{id}:
 *   put:
 *     summary: Atualizar um autor pelo ID
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do autor
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autor atualizado com sucesso
 *       404:
 *         description: Autor não encontrado
 *       400:
 *         description: Erro na atualização do autor
 */
exports.updateAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!author) {
            return res.status(404).send({ message: 'Autor não encontrado' });
        }
        res.send(author);
    } catch (error) {
        res.status(400).send(error);
    }
};

/**
 * @swagger
 * /api/autores/{id}:
 *   delete:
 *     summary: Deletar um autor pelo ID
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do autor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Autor deletado com sucesso
 *       404:
 *         description: Autor não encontrado
 *       500:
 *         description: Erro ao deletar autor
 */
exports.deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) {
            return res.status(404).send({ message: 'Autor não encontrado' });
        }
        res.send({ message: 'Autor deletado com sucesso' });
    } catch (error) {
        res.status(500).send(error);
    }
};

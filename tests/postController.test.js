const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Post = require('../models/Post');
const Author = require('../models/Author');

const {
    DB_DATABASE,
    DB_HOSTNAME,
    DB_PORT
} = process.env;

describe('Post API', () => {
    let authorId;

    beforeAll(async () => {
        // Conecta com a database
        await mongoose.connect(`mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`, {});

        // Cria o autor para o teste
        const author = new Author({ name: 'Solange Lebrao', email: 'solange@email.com' });
        await author.save();
        authorId = author._id;
    });

    afterEach(async () => {
        // Limpa a base após os testes
        await Post.deleteMany();
        await Author.deleteMany();
    });


    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('deve criar um novo post', async () => {
        const res = await request(app)
            .post('/api/posts')
            .send({
                title: 'Teste Post',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                author: authorId
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.title).toBe('Teste Post');
        expect(res.body.content).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    });

    it('deve listar todos os posts', async () => {
        const res = await request(app).get('/api/posts');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('deve listar post pelo ID', async () => {
        const post = new Post({ title: 'Teste Post', content: 'Test content', author: authorId });
        await post.save();

        const res = await request(app).get(`/api/posts/${post._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toBe('Teste Post');
    });

    it('deve atualizar post pelo ID', async () => {
        const post = new Post({ title: 'Titulo antigo', content: 'Conteudo antigo', author: authorId });
        await post.save();

        const res = await request(app)
            .put(`/api/posts/${post._id}`)
            .send({ title: 'Titulo atualizado', content: 'Conteudo atualizado' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toBe('Titulo atualizado');
    });

    it('deve excluir post pelo ID', async () => {
        const post = new Post({ title: 'Post para apagar', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', author: authorId });
        await post.save();

        const res = await request(app).delete(`/api/posts/${post._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Post deletado com sucesso');
    });

    it('deve procurar post por palavra', async () => {
        const post1 = new Post({ title: 'Primeiro Post', content: 'Primeiro conteudo', author: authorId });
        const post2 = new Post({ title: 'Outro Post', content: 'Segundo conteudo', author: authorId });
        await post1.save();
        await post2.save();

        const res = await request(app).get('/api/posts/busca/conteudo');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(2);
    });
});

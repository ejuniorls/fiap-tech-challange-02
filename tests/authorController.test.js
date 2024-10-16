const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Author = require('../models/Author');

const {
    DB_DATABASE,
    DB_HOSTNAME,
    DB_PORT
} = process.env;

describe('Author API', () => {

    beforeAll(async () => {
        // Conecta com a database
        await mongoose.connect(`mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`, {});
    });

    afterEach(async () => {
        // Limpa a base após os testes
        await Author.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });


    it('deve criar um novo autor', async () => {
        const res = await request(app)
            .post('/api/autores')
            .send({
                name: 'Ana Maria',
                email: 'ana_maria@email.com'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toBe('Ana Maria');
        expect(res.body.email).toBe('ana_maria@email.com');
    });

    it('deve listar todos os autores', async () => {
        const res = await request(app).get('/api/autores');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('deve listar autor pelo ID', async () => {
        const author = new Author({ name: 'Ana Maria', email: 'ana_maria@email.com' });
        await author.save();

        const res = await request(app).get(`/api/autores/${author._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe('Ana Maria');
    });

    it('deve atualizar autor pelo ID', async () => {
        const author = new Author({ name: 'Ana Maria', email: 'ana_maria@email.com' });
        await author.save();

        const res = await request(app)
            .put(`/api/autores/${author._id}`)
            .send({ name: 'Nome atualizado', email: 'ana_maria_atualizado@email.com' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe('Nome atualizado');
    });

    it('deve excluir autor pelo ID', async () => {
        const author = new Author({ name: 'Ana Maria', email: 'ana_maria@email.com' });
        await author.save();

        const res = await request(app).delete(`/api/autores/${author._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Autor deletado com sucesso');
    });

    it('deve procurar autor por palavra', async () => {
        const author1 = new Author({ name: 'Ana Maria', email: 'ana_maria@email.com' });
        const author2 = new Author({ name: 'Joao Pedro', email: 'joao_pedro@email.com' });
        await author1.save();
        await author2.save();

        const res = await request(app).get('/api/autores/busca/Ana');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(1);
    });
});

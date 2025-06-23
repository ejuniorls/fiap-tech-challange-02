// base.service.js
class BaseService {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return await this.model.create(data);
    }

    async findAll() {
        return await this.model.findAll();
    }

    async findById(id) {
        return await this.model.findByPk(id);
    }

    async update(id, data) {
        const record = await this.model.findByPk(id);
        if (!record) {
            const error = new Error(`${this.model.name} não encontrado`);
            error.statusCode = 404;
            throw error;
        }

        return await record.update(data);
    }

    async delete(id) {
        const record = await this.model.findByPk(id);
        if (!record) throw new Error(`${this.model.name} não encontrado`);
        return await record.destroy(); // soft delete
    }

    async restore(id) {
        const record = await this.model.findByPk(id, { paranoid: false });
        if (!record) throw new Error(`${this.model.name} não encontrado`);
        return await record.restore();
    }
}

module.exports = BaseService;
const BaseService = require('./base.service');
const { User, Role } = require('../models');

class UserRoleService extends BaseService {
    constructor() {
        super(UserRoles); // Assumindo que você tem o modelo UserRoles importado
    }

    async findByUserId(userId) {
        const user = await User.findByPk(userId, {
            include: {
                model: Role,
                as: 'roles',
                through: { attributes: [] }
            }
        });

        if (!user) {
            const error = new Error('Usuário não encontrado');
            error.statusCode = 404;
            throw error;
        }

        return user.roles;
    }

    async assignRole(userId, roleId) {
        const [user, role] = await Promise.all([
            User.findByPk(userId),
            Role.findByPk(roleId)
        ]);

        if (!user || !role) {
            const error = new Error('Usuário ou Role não encontrado');
            error.statusCode = 404;
            throw error;
        }

        await user.addRole(role);
        return { userId, roleId };
    }

    async updateUserRoles(userId, roleIds) {
        const user = await User.findByPk(userId);
        if (!user) {
            const error = new Error('Usuário não encontrado');
            error.statusCode = 404;
            throw error;
        }

        await user.setRoles(roleIds);
        return this.findByUserId(userId);
    }

    async removeRole(userId, roleId) {
        const [user, role] = await Promise.all([
            User.findByPk(userId),
            Role.findByPk(roleId)
        ]);

        if (!user || !role) {
            const error = new Error('Usuário ou Role não encontrado');
            error.statusCode = 404;
            throw error;
        }

        await user.removeRole(role);
        return { message: 'Role removido com sucesso' };
    }

    async findUsersByRoleId(roleId) {
        const role = await Role.findByPk(roleId, {
            include: {
                model: User,
                as: 'users',
                through: { attributes: [] }
            }
        });

        if (!role) {
            const error = new Error('Role não encontrado');
            error.statusCode = 404;
            throw error;
        }

        return role.users;
    }

    // Sobrescrevendo o método delete do BaseService para não permitir exclusão direta
    async delete() {
        throw new Error('Não é permitido excluir associações diretamente');
    }

    // Sobrescrevendo o método restore do BaseService para não permitir restauração direta
    async restore() {
        throw new Error('Não é permitido restaurar associações diretamente');
    }
}

module.exports = new UserRoleService();
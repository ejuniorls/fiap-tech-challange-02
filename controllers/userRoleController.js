const userRoleService = require("../services/userRoleService");

module.exports = {
  async index(req, res) {
    try {
      const userRoles = await userRoleService.findAll();
      res.json(userRoles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUserRoles(req, res) {
    try {
      const roles = await userRoleService.findByUserId(req.params.userId);
      if (!roles) {
        return res.status(404).json({ error: "Usuário não encontrado ou sem roles atribuídos" });
      }
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async assignRole(req, res) {
    try {
      const { userId, roleId } = req.body;
      const userRole = await userRoleService.assignRole(userId, roleId);
      res.status(201).json(userRole);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateUserRoles(req, res) {
    try {
      const { userId } = req.params;
      const { roleIds } = req.body;
      const updatedRoles = await userRoleService.updateUserRoles(userId, roleIds);
      res.json(updatedRoles);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async removeRole(req, res) {
    try {
      const { userId, roleId } = req.body;
      await userRoleService.removeRole(userId, roleId);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async getRoleUsers(req, res) {
    try {
      const users = await userRoleService.findUsersByRoleId(req.params.roleId);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
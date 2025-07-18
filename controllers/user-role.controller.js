const userRoleService = require("../services/user-role.service");

module.exports = {
  async index(req, res) {
    try {
      const userRoles = await userRoleService.findAll();
      res.json(userRoles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async showByUser(req, res) {
    try {
      const userRoles = await userRoleService.findByUserId(req.params.userId);
      res.json(userRoles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async showByRole(req, res) {
    try {
      const userRoles = await userRoleService.findByRoleId(req.params.roleId);
      res.json(userRoles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async store(req, res) {
    try {
      const { userId, roleId } = req.params;

      // Verifica se a relação já existe
      const exists = await userRoleService.exists(userId, roleId);
      if (exists) {
        return res
          .status(400)
          .json({ error: "This user already has this role" });
      }

      const userRole = await userRoleService.create({
        user_id: userId,
        role_id: roleId,
      });

      res.status(201).json(userRole);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async destroy(req, res) {
    try {
      const { userId, roleId } = req.params;
      await userRoleService.delete(userId, roleId);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};

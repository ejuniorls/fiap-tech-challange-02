const { Role } = require("../models");
const BaseService = require("./BaseService");

class RoleService extends BaseService {
  constructor() {
    super(Role);
  }
}

module.exports = new RoleService();

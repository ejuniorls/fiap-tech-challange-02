const { Role } = require("../models");
const BaseService = require("./base.service");

class RoleService extends BaseService {
  constructor() {
    super(Role);
  }
}

module.exports = new RoleService();

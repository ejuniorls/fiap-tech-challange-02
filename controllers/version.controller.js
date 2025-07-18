const pkg = require("../package.json");

module.exports = {
  async getVersion(req, res) {
    res.json({
      version: pkg.version,
      name: pkg.name,
      description: pkg.description,
      environment: process.env.NODE_ENV || "development",
    });
  },
};

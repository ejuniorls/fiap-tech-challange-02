const bcrypt = require("bcrypt");

async function passwordHashUtil(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

module.exports = passwordHashUtil;

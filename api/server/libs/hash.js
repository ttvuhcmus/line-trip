const bcrypt = require("bcryptjs");

const hashPassword = password => {
  if (!password) return "";
  return bcrypt.hashSync(password, 10);
};

const checkPassword = (pass, hashPass) => {
  return bcrypt.compareSync(pass, hashPass);
};

module.exports = {
  hashPassword,
  checkPassword
};

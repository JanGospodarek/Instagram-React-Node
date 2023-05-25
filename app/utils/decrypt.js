const bcrypt = require("bcryptjs");

const decrypt = async (userpass, encrypted) => {
  let decrypted = await bcrypt.compare(userpass, encrypted);
  return decrypted;
};
module.exports = decrypt;

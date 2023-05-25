const bcrypt = require("bcryptjs");

async function encrypt(pass) {
  let encryptedPassword = await bcrypt.hash(pass, 10);
  console.log(encryptedPassword);
  return encryptedPassword;
}
module.exports = encrypt;

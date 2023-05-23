const model = require("../model/model");
const fs = require("fs");

module.exports = {
  writeFileJSON() {
    fs.writeFileSync(
      __dirname + "/json/files.json",
      JSON.stringify(model.photos)
    );
    fs.writeFileSync(
      __dirname + "/json/users.json",
      JSON.stringify(model.users)
    );
  },
  readFileJSON() {
    model.photos = JSON.parse(fs.readFileSync(__dirname + "/json/files.json"));
    model.users = JSON.parse(fs.readFileSync(__dirname + "/json/users.json"));
  },
};

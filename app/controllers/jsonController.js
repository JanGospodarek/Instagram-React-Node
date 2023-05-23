const model = require("../model/model");
const fs = require("fs");

module.exports = {
  writeFileJSON(data) {
    fs.writeFileSync(__dirname + "/json/files.json", JSON.stringify(data));
  },
  readFileJSON() {
    console.log(__dirname);
    model.photos = JSON.parse(fs.readFileSync(__dirname + "/json/files.json"));
  },
};

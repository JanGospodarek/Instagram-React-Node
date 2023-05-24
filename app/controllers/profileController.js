const model = require("../model/model");
const jwt = require("jsonwebtoken");
const jsonController = require("./jsonController");
const asyncFs = require("fs.promises");
const fs = require("fs");
module.exports = {
  getUserData: async (decoded) => {
    const index = model.users.findIndex((el) => el.email == decoded.email);

    const { email, name, lastName } = model.users[index];

    return { type: "OK", data: { email, name, lastName }, code: 200 };
  },
  mutateUserData: async (decoded, data) => {
    const index = model.users.findIndex((el) => el.email == decoded.email);

    model.users[index].name = data.name;
    model.users[index].lastName = data.lastName;

    jsonController.writeFileJSON();

    return { type: "OK", msg: "User data successfully changed", code: 200 };
  },
  uploadProfileImage: async (decoded, form, req, path) => {
    const index = model.users.findIndex((el) => el.email == decoded.email);
    // const dirs = await asyncFs.readdir(`${path}/profiles`);
    // console.log(dirs);
    if (fs.existsSync(`${path}/profiles/${model.users[index].id}`)) {
      //Users has already profile images

      fs.readdir(`${path}/profiles/${model.users[index].id}`, (err, files) => {
        if (err) throw err;
        console.log(files);
        ///Shit dont work
        for (const file of files) {
          fs.unlink(
            `${path}/profiles/${model.users[index].id}/${file}`,
            (err) => {
              if (err) throw err;
              console.log("woww");
            }
          );
        }
      });

      //   for (const file of await fs.readdir(
      //     `${path}/profiles/${model.users[index].id}`
      //   )) {
      //     await fs.unlink(`${path}/profiles/${model.users[index].id}/${file}`);
      //   }
    } else {
      await fs.mkdirSync(`${path}/profiles/${model.users[index].id}`);
      form.uploadDir = `${path}/profiles/${model.users[index].id}`; // folder do zapisu zdjęcia
      form.keepExtensions = true;
      form.parse(req, function (err, fields, files) {
        console.log(files.file.path);
      });
    }

    return { type: "OK", msg: "Photo uploaded", code: 200 };
  },
};

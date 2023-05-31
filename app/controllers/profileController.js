const model = require("../model/model");
const jwt = require("jsonwebtoken");
const jsonController = require("./jsonController");
const asyncFs = require("fs.promises");
const fs = require("fs");
module.exports = {
  getUserData: async (decoded, path) => {
    const index = model.users.findIndex((el) => el.email == decoded.email);

    const { email, name, lastName, id, userName } = model.users[index];

    return {
      type: "OK",
      data: { email, name, lastName, userName },
      code: 200,
    };
  },
  getUserImage: async (userName, path) => {
    const index = model.users.findIndex((el) => el.userName == userName);
    const { id } = model.users[index];
    console.log(`${path}/profiles/${id}`);
    if (await fs.existsSync(`${path}/profiles/${id}`)) {
      return await asyncFs.readFile(`${path}/profiles/${id}/profile.jpg`);
    } else {
      return await asyncFs.readFile(`${path}/default.png`);
    }
  },
  mutateUserData: async (decoded, data) => {
    const index = model.users.findIndex((el) => el.email == decoded.email);

    const index2 = model.users.findIndex(
      (el) => el.userName == data.userName && el.email !== decoded.email
    );
    if (index2 !== -1) {
      return {
        type: "ERROR",
        msg: "User with username " + data.userName + " already exists!",
        code: 401,
      };
    } else {
      model.users[index].name = data.name;
      model.users[index].lastName = data.lastName;
      model.users[index].userName = data.userName;

      jsonController.writeFileJSON();

      return { type: "OK", msg: "User data successfully changed", code: 200 };
    }
  },
  uploadProfileImage: async (decoded, form, req, path) => {
    const index = model.users.findIndex((el) => el.email == decoded.email);
    // const dirs = await asyncFs.readdir(`${path}/profiles`);
    // console.log(dirs);

    form.uploadDir = `${path}/temp`; // folder do zapisu zdjęcia
    form.keepExtensions = true;

    if (fs.existsSync(`${path}/profiles/${model.users[index].id}`)) {
      //Users has already profile images

      fs.readdir(`${path}/profiles/${model.users[index].id}`, (err, files) => {
        if (err) throw err;
        console.log(files);
        ///Shit dont work
        for (const file of files) {
          // fs.rm(`${path}/profiles/${model.users[index].id}/${file}`, (err) => {
          //   if (err) throw err;
          //   console.log("woww");

          form.parse(req, (err, fields, files) => {
            fs.rename(
              files.file.path,
              `${path}/profiles/${model.users[index].id}/profile.jpg`,
              (err) => {}
            );
          });
          // });
        }
      });

      //   for (const file of await fs.readdir(
      //     `${path}/profiles/${model.users[index].id}`
      //   )) {
      //     await fs.unlink(`${path}/profiles/${model.users[index].id}/${file}`);
      //   }
    } else {
      // await fs.mkdirSync(`${path}/profiles/${model.users[index].id}`);
      // form.uploadDir = `${path}/profiles/${model.users[index].id}`; // folder do zapisu zdjęcia
      // form.keepExtensions = true;
      // form.parse(req, function (err, fields, files) {
      //   console.log(files.file.path);
      // });

      form.parse(req, function (err, fields, files) {
        fs.mkdir(`${path}/profiles/${model.users[index].id}`, (err) => {
          fs.rename(
            files.file.path,
            `${path}/profiles/${model.users[index].id}/profile.jpg`,
            (err) => {}
          );
        });
      });
    }

    return { type: "OK", msg: "Photo uploaded", code: 200 };
  },
};

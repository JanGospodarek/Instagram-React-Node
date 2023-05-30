const model = require("../model/model");
const jwt = require("jsonwebtoken");
const jsonController = require("./jsonController");
const asyncFs = require("fs.promises");
const fs = require("fs");
module.exports = {
  getUserData: async (decoded, path) => {
    const index = model.users.findIndex((el) => el.email == decoded.email);

    const { email, name, lastName, id } = model.users[index];

    return {
      type: "OK",
      data: { email, name, lastName },
      code: 200,
    };
  },
  getUserImage: async (decoded, path) => {
    const index = model.users.findIndex((el) => el.email == decoded.email);
    const { id } = model.users[index];

    if (fs.existsSync(`${path}/profiles/${id}`)) {
      fs.readFile(`${path}/profiles/${id}/profile.jpg`, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Error reading the image file");
        } else {
          // Set the appropriate headers
          // Send the image data
          return data;
        }
      });
    } else {
      return undefined;
    }
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

const model = require("../model/model");
const fs = require("fs");
const jsonController = require("./jsonController");
const asyncFs = require("fs.promises");
const sharp = require("sharp");

module.exports = {
  addPhoto: async (form, req, path) => {
    form.uploadDir = `${path}/temp`; // folder do zapisu zdjęcia
    form.keepExtensions = true;
    // const resize = async (path) => {
    //   await sharp(path + "/data" + photo.url)
    //     .tint({ r: data.r, g: data.g, b: data.b })
    //     .toFile(path + "/data" + newName);
    // };
    form.parse(req, function (err, fields, files) {
      const albumName = fields.album;
      const newFileName =
        files.file.path.split("/")[files.file.path.split("/").length - 1];

      fs.mkdir(`${path}/albums/${albumName}`, (err) => {
        resize = sharp(files.file.path)
          .resize({
            width: 400,
            height: 400,
            fit: sharp.fit.cover,
          })
          .toFile(`${path}/albums/${albumName}/${newFileName}`)
          .then(() => {
            const photoId = Date.now();
            //prettier-ignore

            const photo = new model.Photo(photoId, albumName, files.file.name, `/albums/${albumName}/${newFileName}`, 'original', [{ status: "original", lastModifiedDate: files.file.lastModifiedDate }],[])
            model.photos.push(photo);
            return (
              {
                type: "OK",
                photoId,
                code: 200,
              },
              jsonController.writeFileJSON()
            );
          });
      });
    });
  },
  getAllFiles: () => {
    return model.photos;
  },
  getSpecifiedFile: (id, userName) => {
    if (userName) {
      const files = [];
      model.photos.forEach((img) => {
        if (img.album == userName) files.push(img);
      });

      const last = files[files.length - 1];
      console.log(last);
      console.log(files);
      return last;
    } else {
      const index = model.photos.findIndex((el) => el.id == id);
      if (index !== -1) return model.photos[index];
      else return { msg: "There is no photo with id " + id };
    }
  },
  updateFile: (data) => {
    const index = model.photos.findIndex((el) => el.id == data.id);

    if (index !== -1) {
      if (data.typ == "history") {
        //prettier-ignore
        model.photos[index].lastChange = `${data.status} ${model.photos[index].history.length - 1}`;
        if (data.url) {
          model.photos[index].history.push({
            status: `${data.status}`,
            lastModifiedDate: Date.now(),
            url: data.url,
          });
        } else {
          model.photos[index].history.push({
            status: `${data.status} ${model.photos[index].history.length - 1}`,
            lastModifiedDate: Date.now(),
          });
        }
      } else {
        model.photos[index].tags.push(...data.data);
      }
      jsonController.writeFileJSON();

      return model.photos[index];
    } else {
      return { msg: "Photo with id " + data.id + " does not exist" };
    }
  },
  deleteFile: (id, path) => {
    const index = model.photos.findIndex((el) => el.id == id);
    if (index !== -1) {
      console.log(model.photos[index].url);
      fs.rm(path + model.photos[index].url, (err) => {
        // const pathArr = model.photos[index].url.split("/");
        // pathArr.pop();
        model.photos.splice(index, 1);
        jsonController.writeFileJSON();

        // console.log("path", pathArr.join("/"));
        // fs.readdir(pathArr.join("/"), function (err, files) {
        //   console.log("files", files);
        //   if (!files.length) {
        //     fs.rmdir(pathArr.join("/"), (err) => {});
        //   }
        // });
      });
      return { msg: "Successfully deleted photo with id " + id };
    } else return { msg: "There is no photo with id " + id };
  },
  getImage: async (id, filter, path) => {
    const index = model.photos.findIndex((el) => el.id == id);
    if (index !== -1) {
      if (filter) {
        const indexFilter = model.photos[index].history.findIndex(
          (el) => el.status == filter
        );
        console.log(model.photos[index].history, filter);
        if (indexFilter !== -1)
          //read photo
          return {
            type: "OK",
            filePath: model.photos[index].history[indexFilter].url,
          };
        else
          return {
            type: "ERROR",
            msg: "There is no filter " + filter + " on photo " + id,
          };
      } else {
        // const { id } = model.users[index];
        if (
          await fs.existsSync(`${path}/albums/${model.photos[index].album}`)
        ) {
          if (model.photos[index].history.length > 1) {
            const lastUrl =
              model.photos[index].history[
                model.photos[index].history.length - 1
              ].url;
            return await asyncFs.readFile(`${path}${lastUrl}`);
          } else {
            return await asyncFs.readFile(`${path}${model.photos[index].url}`);
          }
        } else {
          return undefined;
        }
        //read photo
      }
    } else {
      return { type: "ERROR", msg: "There is no file with id " + id };
    }
  },
};

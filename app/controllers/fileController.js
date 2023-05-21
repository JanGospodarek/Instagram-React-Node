const model = require("../model/model");
const fs = require("fs");
const jsonController = require("./jsonController");

module.exports = {
  addPhoto: (form, req, path) => {
    console.log(model.photos);
    form.uploadDir = `${path}/temp`; // folder do zapisu zdjęcia
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
      const albumName = fields.album;
      const newFileName =
        files.file.path.split("/")[files.file.path.split("/").length - 1];
      console.log(files.file.path);

      fs.mkdir(`${path}/albums/${albumName}`, (err) => {
        fs.rename(
          files.file.path,
          `${path}/albums/${albumName}/${newFileName}`,
          (err) => {
            //prettier-ignore
            const photo = new model.Photo(Date.now(), albumName, files.file.name, `/albums/${albumName}/${newFileName}`, 'original', [{ status: "original", lastModifiedDate: files.file.lastModifiedDate }],[])
            model.photos.push(photo);
            jsonController.writeFileJSON(model.photos);
          }
        );
      });
    });
  },
  getAllFiles: () => {
    return model.photos;
  },
  getSpecifiedFile: (id) => {
    console.log(id);
    const index = model.photos.findIndex((el) => el.id == id);
    if (index !== -1) return model.photos[index];
    else return { msg: "There is no photo with id " + id };
  },
  updateFile: (data) => {
    console.log(data);
    const index = model.photos.findIndex((el) => el.id == data.id);

    if (index !== -1) {
      if (data.typ == "history") {
        //prettier-ignore
        model.photos[index].lastChange = `${data.status} ${model.photos[index].history.length - 1}`;
        if (data.url) {
          model.photos[index].history.push({
            status: `${data.status} ${model.photos[index].history.length - 1}`,
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
      jsonController.writeFileJSON(model.photos);

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
        jsonController.writeFileJSON(model.photos);

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
};

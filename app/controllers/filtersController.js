const model = require("../model/model");
const getPhotoMetadata = require("../utils/getPhotoMetadata");
const fileController = require("./fileController");
const jsonController = require("../controllers/jsonController");
const sharp = require("sharp");
module.exports = {
  getMetadata: async (id, path) => {
    const photoIndex = model.photos.findIndex((el) => el.id == id);
    const data = await getPhotoMetadata(
      path + "/data" + model.photos[photoIndex].url
    );
    return data;
  },
  addFilterToPhoto: async (data, path) => {
    const photoIndex = model.photos.findIndex((el) => el.id == data.id);
    const photo = model.photos[photoIndex];

    const photoUrlArr = photo.url.split(".");
    photoUrlArr[0] = photoUrlArr[0] + `-${data.filter}`;
    const newName = photoUrlArr.join(".");

    switch (data.filter) {
      case "tint":
        await sharp(path + "/data" + photo.url)
          .tint({ r: data.r, g: data.g, b: data.b })
          .toFile(path + "/data" + newName);
        break;

      default:
        break;
    }

    fileController.updateFile({
      id: data.id,
      typ: "history",
      status: data.filter,
      url: newName,
    });

    return photo;
  },
};

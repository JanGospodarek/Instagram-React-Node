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
      case "saturate":
        await sharp(path + "/data" + photo.url)
          .modulate({ saturation: data.amount / 100 })
          .toFile(path + "/data" + newName);
        break;
      case "brightness":
        await sharp(path + "/data" + photo.url)
          .modulate({ brightness: data.amount / 100 })
          .toFile(path + "/data" + newName);
        break;
      case "invert":
        await sharp(path + "/data" + photo.url)
          .negate()
          .toFile(path + "/data" + newName);
        break;
      case "grayscale":
        await sharp(path + "/data" + photo.url)
          .grayscale()
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

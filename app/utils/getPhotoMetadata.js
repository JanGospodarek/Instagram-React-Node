const sharp = require("sharp");
getPhotoMetadata = async (filePath) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (filePath) {
        let meta = await sharp(filePath).metadata();
        resolve(meta);
      } else {
        resolve("url_not_found");
      }
    } catch (err) {
      reject(err.mesage);
    }
  });
};
module.exports = getPhotoMetadata;

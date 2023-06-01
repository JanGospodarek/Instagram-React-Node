const fileController = require("../controllers/fileController");
const getRequestData = require("../utils/getRequestData");
const model = require("../model/model");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");
const imageRouter = async (req, res, path) => {
  switch (req.method) {
    case "GET":
      if (req.url == "/api/photos") {
        const photos = fileController.getAllFiles();

        res.end(JSON.stringify(photos, null, 5));
      } else if (req.url.match(/\/api\/photos\/([0-9]+)/)) {
        const id = req.url.split("/")[req.url.split("/").length - 1];
        const photo = fileController.getSpecifiedFile(id);
      } else if (req.url.match(/\/api\/photos\/file\/([0-9]+)/)) {
        const id = req.url.split("/")[req.url.split("/").length - 1];
        const photo = await fileController.getImage(
          id,
          undefined,
          path + "/data"
        );

        res.setHeader("Content-Type", "image/jpg");
        // res.setHeader("Content-Length", resData.length);

        res.end(photo);
      } else if (req.url.match(/\/api\/photos\/last\/(.*)/)) {
        const userName = req.url.split("/")[req.url.split("/").length - 1];
        const photo = fileController.getSpecifiedFile(undefined, userName);
        console.log(photo);
        res.end(JSON.stringify(photo, null, 5));
      }

      break;

    case "POST":
      if (req.url == "/api/photos") {
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith("Bearer")
        ) {
          try {
            const token = req.headers.authorization.split(" ")[1];
            console.log(token);
            const decoded = await jwt.verify(token, process.env.SECRET_KEY);

            if (!decoded) {
              //prettier-ignore
              res.end(JSON.stringify({ type: "ERROR", msg: "Invalid token", code: 401 }, null, 5));
              return;
            }
            if (model.invalidTokens.includes(token)) {
              //prettier-ignore
              res.end(JSON.stringify({ type: "ERROR", msg: "Token expired", code: 401 }, null, 5));
              return;
            }

            let form = formidable({});
            const resData = await fileController.addPhoto(
              form,
              req,
              path + "/data"
            );
            res.end(JSON.stringify(resData, null));
          } catch (err) {
            //prettier-ignore
            res.end(JSON.stringify({ type: "ERROR", msg: err.message, code: 401 },null,));
          }
        }
      }

      break;
    case "PATCH":
      if (req.url == "/api/photos" || req.url == "/api/photos/tags/mass") {
        const data = await getRequestData(req);
        const parsed = JSON.parse(data);
        const msg = fileController.updateFile(parsed);
        res.end(JSON.stringify(msg, null, 5));
      }

      break;
    case "DELETE":
      if (req.url.match(/\/api\/photos\/([0-9]+)/)) {
        const id = req.url.split("/")[req.url.split("/").length - 1];
        const msg = fileController.deleteFile(id, path + "/data");

        res.end(JSON.stringify(msg, null, 5));
      }

      break;
  }
};
module.exports = imageRouter;

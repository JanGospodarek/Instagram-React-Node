const tagsController = require("../controllers/tagsController");
const getRequestData = require("../utils/getRequestData");
const model = require("../model/model");

const tagsRouter = async (req, res) => {
  switch (req.method) {
    case "GET":
      if (req.url == "/api/tags") {
        res.end(JSON.stringify(model.tagsObjects, null, 5));
      }
      if (req.url == "/api/tags/raw") {
        res.end(JSON.stringify(model.tags, null, 5));
      }
      if (req.url.match(/\/api\/tags\/([0-9]+)/)) {
        const id = Number(req.url.split("/")[req.url.split("/").length - 1]);
        if (!isNaN(id)) {
          const tag = tagsController.getSpecifiedTagObject(id);
          res.end(JSON.stringify(tag, null, 5));
        }
      }
      break;

    case "POST":
      if (req.url == "/api/tags") {
        const data = await getRequestData(req);
        const resData = tagsController.addTag(JSON.parse(data));
        res.end(JSON.stringify(resData, null, 5));
      }

      break;
    case "PATCH":
      if (req.url == "/api/photos") {
        const data = await getRequestData(req);
        const parsed = JSON.parse(data);
      }

      break;
    case "DELETE":
      if (req.url.match(/\/api\/photos\/([0-9]+)/)) {
        const id = req.url.split("/")[req.url.split("/").length - 1];
      }

      break;
  }
};
module.exports = tagsRouter;

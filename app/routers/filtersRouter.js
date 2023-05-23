const fileController = require("../controllers/fileController");
const filtersController = require("../controllers/filtersController");

const filtersRouter = async (req, res, path) => {
  switch (req.method) {
    case "GET":
      if (req.url.match(/\/api\/filters\/metadata\/([0-9]+)/)) {
        const id = req.url.split("/")[req.url.split("/").length - 1];
        const { width, height } = await filtersController.getMetadata(id, path);
        res.end(JSON.stringify({ width: width, height: height }, null, 5));
      }
      if (req.url.match(/\/api\/getfile\/([0-9]+)\/([^\s]+)/)) {
        const filter = req.url.split("/")[req.url.split("/").length - 1];
        const id = req.url.split("/")[req.url.split("/").length - 2];
        const data = await fileController.getImage(id, filter);
        if (data.type == "OK")
          // TODO: wysylanie obrazka
          res.end(`<img src='${path + "/data" + data.filePath}'>`);
        else res.end(JSON.stringify({ msg: data.msg }, null, 5));
        return;
      }

      if (req.url.match(/\/api\/getfile\/([0-9]+)/)) {
        const id = req.url.split("/")[req.url.split("/").length - 1];
        const data = await fileController.getImage(id);
        if (data.type == "OK")
          // TODO: wysylanie obrazka

          res.end(`<img src='${path + "/data" + data.filePath}'>`);
        else res.end(JSON.stringify({ msg: data.msg }, null, 5));
      }

      break;

    case "POST":
      if (req.url == "/api/photos") {
      }

      break;
    case "PATCH":
      if (req.url == "/api/filters") {
        const data = await getRequestData(req);
        const parsed = JSON.parse(data);

        const photoData = await filtersController.addFilterToPhoto(
          parsed,
          path
        );
        res.end(JSON.stringify(photoData, null, 5));
      }

      break;
    case "DELETE":
      break;
  }
};
module.exports = filtersRouter;

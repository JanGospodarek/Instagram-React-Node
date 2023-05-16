const filtersController = require("../controllers/filtersController");

const filtersRouter = async (req, res) => {
  switch (req.method) {
    case "GET":
      if (req.url.match(/\/api\/filters\/metadata\/([0-9]+)/)) {
        const id = req.url.split("/")[req.url.split("/").length - 1];
        const { width, height } = await filtersController.getMetadata(id);
        res.end(JSON.stringify({ width: width, height: height }, null, 5));
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

        const photoData = await filtersController.addFilterToPhoto(parsed);
        res.end(JSON.stringify(photoData, null, 5));
      }

      break;
    case "DELETE":
      break;
  }
};
module.exports = filtersRouter;

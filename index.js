const http = require("http");
const logger = require("tracer").colorConsole();
const jsonController = require("./app/controllers/jsonController");
const imageRouter = require("./app/routers/imageRouter");
const tagsRouter = require("./app/routers/tagsRouter");
const filtersRouter = require("./app/routers/filtersRouter");
// http
//     .createServer((req, res) => )
//     .listen(3000, () => logger.log("listen on 3000"))

//
//init json
jsonController.readFileJSON();
http
  .createServer(async (req, res) => {
    //images

    if (req.url.search("/api/photos") != -1) {
      await imageRouter(req, res);
    }

    //tags
    else if (req.url.search("/api/tags") != -1) {
      await tagsRouter(req, res);
    }

    //filters router
    else if (req.url.search("/api/filters") != -1) {
      await filtersRouter(req, res);
    }
  })
  .listen(4000, () => console.log("listen on 4000"));

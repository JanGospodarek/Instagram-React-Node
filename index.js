const http = require("http");
const logger = require("tracer").colorConsole();
const jsonController = require("./app/controllers/jsonController");
const imageRouter = require("./app/routers/imageRouter");
const tagsRouter = require("./app/routers/tagsRouter");
const filtersRouter = require("./app/routers/filtersRouter");
const userRouter = require("./app/routers/userRouter");
const profileRouter = require("./app/routers/profileRouter");
// http
//     .createServer((req, res) => )
//     .listen(3000, () => logger.log("listen on 3000"))

//
//init json
require("dotenv").config();

jsonController.readFileJSON();
http
  .createServer(async (req, res) => {
    //images
    try {
      if (req.url.search("/api/photos") != -1) {
        await imageRouter(req, res, __dirname + "/app");
      }

      //tags
      else if (req.url.search("/api/tags") != -1) {
        await tagsRouter(req, res, __dirname + "/app");
      }

      //filters router
      else if (
        req.url.search("/api/filters") != -1 ||
        req.url.search("/api/getfile") != -1
      ) {
        await filtersRouter(req, res, __dirname + "/app");
      } else if (req.url.search("/api/user") != -1) {
        await userRouter(req, res, __dirname + "/app");
      } else if (
        req.url.search("/api/profil") != -1 ||
        req.url.search("/api/logout") != -1
      ) {
        await profileRouter(req, res, __dirname + "/app");
      }
    } catch (error) {
      console.log(error);
    }
  })
  .listen(process.env.APP_PORT, () => console.log("listen on 4000"));

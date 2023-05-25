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

// Required headers for CORS

// Middleware function to handle preflight requests
// function handlePreflight(req, res, next) {
//   if (req.method === "OPTIONS") {
//     // Intercept preflight requests and respond with the necessary headers
//     res.writeHead(204, corsHeaders);
//     res.end();
//   } else {
//     // Pass control to the next middleware
//     next();
//   }
// }

// Example usage with an HTTP server

jsonController.readFileJSON();
http
  .createServer(async (req, res) => {
    //images
    // await handlePreflight(req, res, async () => {
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      if (req.method === "OPTIONS") {
        // Set the necessary headers for preflight request
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Specify the allowed HTTP methods
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Content-Type, Authorization"
        ); // Specify the allowed headers
        res.writeHead(204); // Send a successful response without any content
        res.end();
        return;
      }

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
        console.log(req.method);

        await userRouter(req, res, __dirname + "/app");
      } else if (
        req.url.search("/api/profil") != -1 ||
        req.url.search("/api/logout") != -1
      ) {
        await profileRouter(req, res, __dirname + "/app");
      }
      // if (req.method == "OPTIONS") {
      // res.setHeader("Access-Control-Allow-Origin", "*");
      // res.end();
      // }
    } catch (error) {
      console.log(error);
    }
    // });
  })
  .listen(process.env.APP_PORT, () => console.log("listen on 4000"));

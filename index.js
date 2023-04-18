const http = require("http");
const logger = require("tracer").colorConsole();

const router = require("./app/router");

// http
//     .createServer((req, res) => )
//     .listen(3000, () => logger.log("listen on 3000"))

http
  .createServer(async (req, res) => {
    //images

    if (req.url.search("/api/photos") != -1) {
      await imageRouter(req, res);
    }

    //tags
    else if (req.url.search("/api/tags") != -1) {
      await tagsRouter(req, res);
    } else {
      router(req, res);
    }
  })
  .listen(PORT, () => console.log("listen on 3000"));

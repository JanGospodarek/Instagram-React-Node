const fileController = require("../controllers/fileController");
const userController = require("../controllers/userController");
const getRequestData = require("../utils/getRequestData");
const model = require("../model/model");
const userRouter = async (req, res, path) => {
  switch (req.method) {
    case "GET":
      if (req.url.match(/\/api\/user\/confirm\/(.*)/)) {
        const token = req.url.split("/")[req.url.split("/").length - 1];
        console.log("token", token);
        const resData = await userController.validateToken(token);

        res.writeHead(resData.code, {
          "Content-Type": "application/json",
        });

        res.end(JSON.stringify(resData, null, 5));
      }
      break;

    case "POST":
      if (req.url == "/api/user/register") {
        const data = await getRequestData(req);
        const resData = await userController.register(JSON.parse(data));

        res.writeHead(resData.code, {
          "Content-Type": "application/json",
        });

        res.end(JSON.stringify(resData, null, 5));
      }
      if (req.url == "/api/user/login") {
        const data = await getRequestData(req);
        const resData = await userController.login(JSON.parse(data));

        res.writeHead(resData.code, {
          "Content-Type": "application/json",
        });

        res.end(JSON.stringify(resData, null, 5));
      }
      break;
    case "PATCH":
      break;
    case "DELETE":
      break;
  }
};
module.exports = userRouter;

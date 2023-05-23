const profileController = require("../controllers/profileController");
const getRequestData = require("../utils/getRequestData");
const model = require("../model/model");

const tagsRouter = async (req, res) => {
  switch (req.method) {
    case "GET":
      if (req.url == "/api/profile") {
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith("Bearer")
        ) {
          const token = req.headers.authorization.split(" ")[1];
          const resData = await profileController.getUserData(token);
          res.end(JSON.stringify(resData, null, 5));
        }
      }
      break;

    case "POST":
      break;
    case "PATCH":
      if (req.url == "/api/profile") {
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith("Bearer")
        ) {
          const token = req.headers.authorization.split(" ")[1];
          const data = await getRequestData(req);
          const resData = await profileController.mutateUserData(
            token,
            JSON.parse(data)
          );
          res.end(JSON.stringify(resData, null, 5));
        }
      }
      break;
    case "DELETE":
      break;
  }
};
module.exports = tagsRouter;

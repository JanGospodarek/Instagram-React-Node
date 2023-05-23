const profileController = require("../controllers/profileController");
const getRequestData = require("../utils/getRequestData");
const model = require("../model/model");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");

const profileRouter = async (req, res, path) => {
  switch (req.method) {
    case "GET":
      if (req.url == "/api/profile") {
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith("Bearer")
        ) {
          try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = await jwt.verify(token, process.env.SECRET_KEY);
            if (!decoded) {
              //prettier-ignore
              res.end(JSON.stringify({ type: "ERROR", msg: "Invalid token", code: 401 }, null, 5));
              return;
            }

            const resData = await profileController.getUserData(decoded);
            res.end(JSON.stringify(resData, null, 5));
          } catch (err) {
            //prettier-ignore
            res.end(JSON.stringify({ type: "ERROR", msg: err.message, code: 401 },null,));
          }
        }
      }
      break;

    case "POST":
      if (req.url == "/api/profile") {
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith("Bearer")
        ) {
          try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = await jwt.verify(token, process.env.SECRET_KEY);
            if (!decoded) {
              //prettier-ignore
              res.end(JSON.stringify({ type: "ERROR", msg: "Invalid token", code: 401 }, null, 5));
              return;
            }
            let form = formidable({});
            //prettier-ignore
            const resData = await profileController.uploadProfileImage(decoded,form, req, path + "/data");

            res.end(JSON.stringify(resData, null, 5));
          } catch (err) {
            //prettier-ignore
            res.end(JSON.stringify({ type: "ERROR", msg: err.message, code: 401 },null,));
          }
        }
      }
      break;
    case "PATCH":
      if (req.url == "/api/profile") {
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith("Bearer")
        ) {
          try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = await jwt.verify(token, process.env.SECRET_KEY);
            if (!decoded) {
              //prettier-ignore
              res.end(JSON.stringify({ type: "ERROR", msg: "Invalid token", code: 401 }, null, 5));
              return;
            }

            const data = await getRequestData(req);

            //prettier-ignore
            const resData = await profileController.mutateUserData(decoded,JSON.parse(data));

            res.end(JSON.stringify(resData, null, 5));
          } catch (err) {
            //prettier-ignore
            res.end(JSON.stringify({ type: "ERROR", msg: err.message, code: 401 },null,));
          }
        }
      }
      break;
    case "DELETE":
      break;
  }
};
module.exports = profileRouter;

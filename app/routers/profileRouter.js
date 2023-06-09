const profileController = require("../controllers/profileController");
const userController = require("../controllers/userController");
const getRequestData = require("../utils/getRequestData");
const model = require("../model/model");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");

const profileRouter = async (req, res, path) => {
  switch (req.method) {
    case "GET":
      if (req.url.match(/\/api\/profile\/photo\/(.*)/)) {
        const userName = req.url.split("/")[req.url.split("/").length - 1];

        try {
          const resData = await profileController.getUserImage(
            userName,
            path + "/data"
          );
          res.setHeader("Content-Type", "image/jpg");
          // res.setHeader("Content-Length", resData.length);

          res.end(resData);
        } catch (err) {
          //prettier-ignore
          res.end(JSON.stringify({ type: "ERROR", msg: err.message, code: 401 },null,));
        }
      }

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
            if (model.invalidTokens.includes(token)) {
              //prettier-ignore
              res.end(JSON.stringify({ type: "ERROR", msg: "Token expired", code: 401 }, null, 5));
              return;
            }
            res.setHeader("Content-Type", "image/jpeg");

            const resData = await profileController.getUserData(
              decoded,
              path + "/data"
            );
            res.end(JSON.stringify(resData, null, 5));
          } catch (err) {
            //prettier-ignore
            res.end(JSON.stringify({ type: "ERROR", msg: err.message, code: 401 },null,));
          }
        }
      }
      if (req.url.match(/\/api\/profile\/username\/(.*)/)) {
        const userName = req.url.split("/")[req.url.split("/").length - 1];
        try {
          const resData = await profileController.getUserDataByUsername(
            userName,
            path + "/data"
          );
          res.end(JSON.stringify(resData, null, 5));
        } catch (err) {
          //prettier-ignore
          res.end(JSON.stringify({ type: "ERROR", msg: err.message, code: 401 },null,));
        }
      }

      if (req.url == "/api/logout") {
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

            if (model.invalidTokens.includes(token)) {
              //prettier-ignore
              res.end(JSON.stringify({ type: "ERROR", msg: "Token expired", code: 401 }, null, 5));
              return;
            }
            const resData = await userController.logout(token);
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
            if (model.invalidTokens.includes(token)) {
              //prettier-ignore
              res.end(JSON.stringify({ type: "ERROR", msg: "Token expired", code: 401 }, null, 5));
              return;
            }
            let form = formidable({});
            //prettier-ignore
            const resData = await profileController.uploadProfileImage(decoded,form, req, path + "/data");
            if (resData.type == "delete") {
              //prettier-ignore
              const resData2 = await profileController.uploadProfileImage(decoded,form, req, path + "/data");
              res.end(JSON.stringify(resData2, null, 5));
            } else {
              res.end(JSON.stringify(resData, null, 5));
            }
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
            if (model.invalidTokens.includes(token)) {
              //prettier-ignore
              res.end(JSON.stringify({ type: "ERROR", msg: "Token expired", code: 401 }, null, 5));
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

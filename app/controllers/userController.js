const model = require("../model/model");
const encrypt = require("../utils/encrypt");
const decrypt = require("../utils/decrypt");
const jsonController = require("./jsonController");
const jwt = require("jsonwebtoken");

const fs = require("fs");

module.exports = {
  register: async (data) => {
    if (!data.name || !data.lastName || !data.email || !data.password)
      return { type: "ERROR", msg: "Some of data is missing" };

    // Check if user exists
    const index = model.users.findIndex((el) => el.email == data.email);
    if (index !== -1)
      return {
        type: "ERROR",
        msg: `User with email ${data.email} already exists`,
      };

    // Create user
    const password = await encrypt(data.password);
    model.users.push(
      new model.User(
        Date.now(),
        data.name,
        data.email,
        password,
        false,
        data.lastName
      )
    );
    // save JSON
    jsonController.writeFileJSON();
    // create token
    const token = await jwt.sign(
      { email: data.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h", // "1m", "1d", "24h"
      }
    );
    return {
      type: "OK",
      msg: `skopiuj poniższy link do przeglądarki http://localhost:${process.env.APP_PORT}/api/user/confirm/${token} w celu potwierdzenia konta Uwaga: link jest ważny przez godzinę`,
    };
  },
  validateToken: async (token) => {
    try {
      let decoded = await jwt.verify(token, process.env.SECRET_KEY);
      console.log({ decoded: decoded });
      const index = model.users.findIndex((el) => el.email == decoded.email);
      model.users[index].confirmed = true;
      // save JSON
      jsonController.writeFileJSON();

      return { type: "OK", msg: "User confirmed!" };
    } catch (ex) {
      return { type: "ERROR", msg: ex.message };
      // TODO: handle different error messages
      //   response.writeHead(401, { "Content-Type": "application/json" }); // invalid token
      //   response.writeHead(400, { "Content-Type": "application/json" }); // niepełne dane usera
      //   response.writeHead(409, { "Content-Type": "application/json" }); // user exists
      //   response.writeHead(201, { "Content-Type": "application/json" }); // user created
      //   response.writeHead(200, { "Content-Type": "application/json" }); // token authorized
      //   response.writeHead(404, { "Content-Type": "application/json" }); // user not found

      switch (ex.message) {
        case "":
          break;

        default:
          break;
      }
    }
  },
  login: async (data) => {
    const index = model.users.findIndex((el) => el.email == data.email);
    if (index == -1) return { type: "ERROR", msg: "User not found" };
    if (!model.users[index].confirmed)
      return { type: "ERROR", msg: "User is not confirmed" };
    const decrypted = await decrypt(data.password, model.users[index].password);
    if (decrypted) {
      return { type: "OK", token };
    } else {
      return { type: "ERROR", msg: "Password is invalid" };
    }
    console.log(decrypted);
  },
};

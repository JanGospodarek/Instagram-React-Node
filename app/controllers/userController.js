const model = require("../model/model");
const encrypt = require("../utils/encrypt");
const decrypt = require("../utils/decrypt");
const jsonController = require("./jsonController");
const jwt = require("jsonwebtoken");

const fs = require("fs");

module.exports = {
  register: async (data) => {
    try {
      if (!data.name || !data.lastName || !data.email || !data.password)
        return { type: "ERROR", msg: "Some of data is missing", code: 400 };

      // Check if user exists
      const index = model.users.findIndex((el) => el.email == data.email);
      if (index !== -1)
        return {
          type: "ERROR",
          msg: `User with email ${data.email} already exists`,
          code: 409,
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
        msg: `skopiuj poniższy link do przeglądarki w celu potwierdzenia konta Uwaga: link jest ważny przez godzinę`,
        // link: `http://localhost:${process.env.APP_PORT}/api/user/confirm/${token}`,
        link: token,
        code: 201,
      };
    } catch (error) {
      console.log(error);
    }
  },
  validateToken: async (token) => {
    try {
      let decoded = await jwt.verify(token, process.env.SECRET_KEY);
      const index = model.users.findIndex((el) => el.email == decoded.email);
      if (index == -1)
        return { type: "ERROR", msg: "user not found", code: 404 };

      if (model.users[index].confirmed)
        return { type: "ERROR", msg: "user already authorized", code: 200 };

      model.users[index].confirmed = true;
      // save JSON
      jsonController.writeFileJSON();

      return { type: "OK", msg: "User confirmed!", code: 200 };
    } catch (ex) {
      return { type: "ERROR", msg: ex.message, code: 401 };
    }
  },
  login: async (data) => {
    const index = model.users.findIndex((el) => el.email == data.email);
    if (index == -1) return { code: 404, type: "ERROR", msg: "User not found" };
    if (!model.users[index].confirmed)
      return { code: 400, type: "ERROR", msg: "User is not confirmed" };
    const decrypted = await decrypt(data.password, model.users[index].password);
    if (decrypted) {
      // create token
      const token = await jwt.sign(
        { email: data.email },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h", // "1m", "1d", "24h"
        }
      );
      return { code: 200, type: "OK", token, msg: "Logged in!" };
    } else {
      return { code: 401, type: "ERROR", msg: "Password is invalid" };
    }
  },
  logout: async (token) => {
    model.invalidTokens.push(token);
    await jsonController.writeFileJSON();
    return { code: 200, type: "OK", msg: "Logged out" };
  },
};

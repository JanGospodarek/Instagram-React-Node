const model = require("../model/model");
const encrypt = require("../utils/encrypt");
const decrypt = require("../utils/decrypt");
const jsonController = require("./jsonController");
const jwt = require("jsonwebtoken");

const fs = require("fs");

module.exports = {
  register: async (data) => {
    try {
      if (
        !data.name ||
        !data.lastName ||
        !data.email ||
        !data.password ||
        !data.userName
      )
        return { type: "ERROR", msg: "Some of data is missing", code: 400 };

      // Check if user exists
      const index = model.users.findIndex((el) => el.email == data.email);
      if (index !== -1)
        return {
          type: "ERROR",
          msg: `Uzytkownik z emailem ${data.email} juz istnieje`,
          code: 409,
        };

      const index2 = model.users.findIndex(
        (el) => el.userName == data.userName
      );
      if (index2 !== -1)
        return {
          type: "ERROR",
          msg: `Uzytkownik z nazwą ${data.userName} juz istnieje`,
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
          data.lastName,
          data.userName
        )
      );
      // save JSON
      jsonController.writeFileJSON();
      // create token
      const token = await jwt.sign(
        { email: data.email, userName: data.userName },
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

      return { type: "OK", msg: "Uzytkownik potwierdzony", code: 200 };
    } catch (ex) {
      return { type: "ERROR", msg: ex.message, code: 401 };
    }
  },
  login: async (data) => {
    const index = model.users.findIndex((el) => el.email == data.email);
    if (index == -1)
      return { code: 404, type: "ERROR", msg: "Nie znaleziono uzytkownika" };
    if (!model.users[index].confirmed)
      return {
        code: 400,
        type: "ERROR",
        msg: "Uzytkownik nie ma patwierdzonego konta",
      };
    const decrypted = await decrypt(data.password, model.users[index].password);
    if (decrypted) {
      // create token
      const token = await jwt.sign(
        { email: data.email, userName: model.users[index].userName },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h", // "1m", "1d", "24h"
        }
      );
      return {
        code: 200,
        type: "OK",
        token,
        msg: "Logged in!",
        name: model.users[index].name,
        lastName: model.users[index].lastName,
        email: model.users[index].email,
      };
    } else {
      return { code: 401, type: "ERROR", msg: "Hasło nieprawidłowe" };
    }
  },
  logout: async (token) => {
    model.invalidTokens.push(token);
    await jsonController.writeFileJSON();
    return { code: 200, type: "OK", msg: "Wylogowano" };
  },
};

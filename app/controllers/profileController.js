const model = require("../model/model");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const jsonController = require("./jsonController");

module.exports = {
  getUserData: async (token) => {
    try {
      let decoded = await jwt.verify(token, process.env.SECRET_KEY);
      const index = model.users.findIndex((el) => el.email == decoded.email);

      const { email, name, lastName } = model.users[index];

      return { type: "OK", data: { email, name, lastName }, code: 200 };
    } catch (ex) {
      return { type: "ERROR", msg: ex.message, code: 401 };
    }
  },
  mutateUserData: async (token, data) => {
    try {
      let decoded = await jwt.verify(token, process.env.SECRET_KEY);
      const index = model.users.findIndex((el) => el.email == decoded.email);
      if (!decoded) {
        return { type: "ERROR", msg: "Invalid token", code: 401 };
      }
      model.users[index].name = data.name;
      model.users[index].lastName = data.lastName;
      jsonController.writeFileJSON();
      return { type: "OK", msg: "User data successfully changed", code: 200 };
    } catch (ex) {
      return { type: "ERROR", msg: ex.message, code: 401 };
    }
  },
};

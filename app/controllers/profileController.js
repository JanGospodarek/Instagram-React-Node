const model = require("../model/model");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const jsonController = require("./jsonController");

module.exports = {
  getUserData: async (decoded) => {
    const index = model.users.findIndex((el) => el.email == decoded.email);

    const { email, name, lastName } = model.users[index];

    return { type: "OK", data: { email, name, lastName }, code: 200 };
  },
  mutateUserData: async (decoded, data) => {
    const index = model.users.findIndex((el) => el.email == decoded.email);

    model.users[index].name = data.name;
    model.users[index].lastName = data.lastName;

    jsonController.writeFileJSON();

    return { type: "OK", msg: "User data successfully changed", code: 200 };
  },
};

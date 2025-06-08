const express = require("express");
const {
  updateUser,
  addUser,
  getAllUser,
  getOneUser,
} = require("../controllers/userControllers");

const Router = express.Router();

Router.post("/user", getAllUser);
Router.put("/user/:id", updateUser);
Router.get("/user/:id", getOneUser);
Router.post("/user/adduser", addUser);

module.exports = Router;

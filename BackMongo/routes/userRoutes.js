const express = require("express");
const {
  updateUser,
  addUser,
  getAllUser,
  getOneUser,
  getAllUsers,
} = require("../controllers/userControllers");
const { Auth } = require("../middlewares/Auth");

const Router = express.Router();

Router.post("/user", getAllUser);
Router.post("/users", Auth, getAllUsers);
Router.put("/user/:id", Auth, updateUser);
Router.get("/user/:id", getOneUser);
Router.post("/user/adduser", Auth, addUser);

module.exports = Router;

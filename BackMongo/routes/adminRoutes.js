const express = require("express");

const {
  getAllAdmin,
  getOneAdmin,
  getPayment,
} = require("../controllers/adminControllers");
const { signin, signup, logout } = require("../controllers/adminLogin");
const { Auth } = require("../middlewares/Auth");
const Router = express.Router();

Router.get("/admin", getAllAdmin);
Router.get("/admin/:id", Auth, getOneAdmin);
Router.post("/admin/payment", Auth, getPayment);

Router.post("/login/signin", signin);
Router.post("/login/signup", signup);
Router.post("/login/logout", Auth, logout);

module.exports = Router;

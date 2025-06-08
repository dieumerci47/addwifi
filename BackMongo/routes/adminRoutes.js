const express = require("express");

const { getAllAdmin, getOneAdmin } = require("../controllers/adminControllers");
const { signin, signup, logout } = require("../controllers/adminLogin");
const { Auth } = require("../middlewares/Auth");
const Router = express.Router();

Router.get("/admin", getAllAdmin);
Router.get("/admin/:id", Auth, getOneAdmin);

Router.post("/login/signin", signin);
Router.post("/login/signup", signup);
Router.post("/login/logout", logout);

module.exports = Router;

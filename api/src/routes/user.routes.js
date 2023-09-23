const express = require("express");
const { UserController } = require("../controllers");

const routes = express.Router();

routes.get("/", UserController.browse);
routes.post("/register", UserController.register);
routes.post("/login", UserController.login);
routes.post("/logout", UserController.logout);

module.exports = routes;

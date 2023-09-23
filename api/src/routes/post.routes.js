const express = require("express");
const { PostController } = require("../controllers");

const routes = express.Router();
routes.get("/", PostController.browse);
routes.post("/addpost", PostController.add);
module.exports = routes;

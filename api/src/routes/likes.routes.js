const express = require("express");
const { LikesController } = require("../controllers");

const routes = express.Router();
routes.get("/:postId", LikesController.getLikes);

module.exports = routes;

const express = require("express");
const { LikesController } = require("../controllers");
const { authorization } = require("../middlewares/AuthMiddleware");

const routes = express.Router();
routes.get("/:postId", LikesController.getLikes);
routes.put("/:postId", authorization, LikesController.addLike);

module.exports = routes;

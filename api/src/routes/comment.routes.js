const express = require("express");
const { CommentController } = require("../controllers");

const routes = express.Router();
routes.get("/", CommentController.getComments);
routes.post("/", CommentController.addComment);

module.exports = routes;

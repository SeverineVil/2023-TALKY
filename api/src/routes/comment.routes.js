const express = require("express");
const { CommentController } = require("../controllers");

const routes = express.Router();
routes.get("/", CommentController.browse);
routes.post("/addcomment", CommentController.add);

module.exports = routes;

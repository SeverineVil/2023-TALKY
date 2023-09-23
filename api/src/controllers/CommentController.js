const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
const models = require("../models");

class CommentController {
  static browse = (req, res) => {
    models.comment
      .findAll()
      .then(([rows]) => {
        res.status(200).send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          error: err.message,
        });
      });
  };

  static add = (req, res) => {
    const { desc, postId } = req.body;
    console.warn(req.body); // TODO à retirer

    const { accessToken } = req.cookies;
    const token = jwt.verify(accessToken, process.env.JWT_AUTH_SECRET);
    try {
      models.comment
        .insert({
          desc,
          userId: token.id,
          postId,
          createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        })
        .then(([result]) => {
          res.status(201).send({
            ...result,
            id: result.insertId,
          });
        })

        .catch((err) => {
          console.error(err);
          res.status(401).send({
            error: "Invalid or expired token",
          });
        });
    } catch (err) {
      res.status(500).send({
        error: `Erreur JWT token : ${err.message}`,
      });
    }
    return true;
  };
}
module.exports = CommentController;

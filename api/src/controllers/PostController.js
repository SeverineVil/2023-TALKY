const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
const models = require("../models");

class PostController {
  static browse = (req, res) => {
    models.post
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
    const { desc, img } = req.body;

    const { accessToken } = req.cookies;
    const token = jwt.verify(accessToken, process.env.JWT_AUTH_SECRET);
    try {
      models.post
        .insert({
          desc,
          img,
          userId: token.id,
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

  static deletePost = (req, res) => {
    const id = parseInt(req.params.id, 10);

    models.post
      .delete(id)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error deleting");
      });
  };
}

module.exports = PostController;

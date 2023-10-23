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

    console.warn(req.body);

    const { accessToken } = req.cookies;
    const token = jwt.verify(accessToken, process.env.JWT_AUTH_SECRET);
    console.error("token reçu : ", JSON.stringify(token));

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
}

module.exports = PostController;

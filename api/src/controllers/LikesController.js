const jwt = require("jsonwebtoken");
const models = require("../models");

class LikesController {
  static getLikes(req, res) {
    const { postId } = req.params;

    models.likes
      .findAll(postId)
      .then(([rows]) => {
        const count = rows[0]["COUNT(*)"];
        res.status(200).json(count.toString());
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          error: err.message,
        });
      });
  }

  static addLike(req, res) {
    console.warn("works");

    const { accessToken } = req.cookies;
    const token = jwt.verify(accessToken, process.env.JWT_AUTH_SECRET);
    console.warn({ accessToken });
    console.warn("Decoded Token:", jwt.decode(accessToken));
    try {
      console.warn("before adding a like");
      models.likes
        .insert({
          userId: token.id,
          postId: req.params.postId,
        })
        .then(([result]) => {
          console.warn("Like inserted successfully");
          res.status(201).send({
            ...result,
            id: result.insertId,
          });
        })
        .catch((err) => {
          console.error("Error while inserting like:", err);
          res.status(500).send({ error: err.message });
        });
    } catch (tokenError) {
      console.error("Error verifying access token:", tokenError);
      res.status(401).send({ error: "Invalid access token" });
    }
  }
}

module.exports = LikesController;

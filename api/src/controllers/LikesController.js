const models = require("../models");

class LikesController {
  static getLikes = async (req, res) => {
    const { postId } = req.params;
    // console.log("postId:", postId);
    models.likes
      .findAll(postId)
      .then(([rows]) => {
        res.status(200).send(rows);
        console.warn(rows);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          error: err.message,
        });
      });
  };
}

module.exports = LikesController;

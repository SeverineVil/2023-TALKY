const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");

class UserController {
  static register = async (req, res) => {
    const { username, email, password, name } = req.body;

    const [user] = await models.user.findByUsername(username);
    if (user.length) {
      res.status(409).send({ error: "Ce nom d'utilisateur existe déjà" });
      return;
    }

    const [mail] = await models.user.findByMail(email);
    if (mail.length) {
      res.status(409).send({
        error: "Cet email existe déjà",
      });
      return;
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      models.user
        .insert({ username, email, password: hash, name })
        .then(([result]) => {
          res.status(201).json({
            ...result,
            id: result.insertId,
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send({
            error: err.message,
          });
        });
    } catch (err) {
      res.status(500).send({
        error: `Erreur lors du chiffrement du mot de passe : ${err.message}`,
      });
    }
  };

  static login = async (req, res) => {
    const { username, password } = req.body;

    models.user
      .findByUsername(username)
      .then(async ([rows]) => {
        if (rows[0] == null) {
          res
            .status(403)
            .send({ error: "nom d'utilisateur ou mot de passe incorrect" });
        } else {
          const { id, password: hash, profilePic } = rows[0];
          try {
            if (await bcrypt.compare(password, hash)) {
              const token = await jwt.sign(
                { id, username },
                process.env.JWT_AUTH_SECRET,
                { expiresIn: "1h" }
              );

              res.cookie("accessToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
              });
              res.status(200).send({
                id,
                username,
                token,
                profilePic,
                message: "logged in !!",
              });
              return;
            }
            res
              .status(403)
              .send(
                "Le nom d'utilisateur ou le mot de passe ne sont pas valides"
              );
          } catch (err) {
            res.status(500).send(`Erreur Interne avec bcrypt ${err}`);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send({
          error: err.message,
        });
      });
  };

  static logout = (req, res) => {
    res
      .clearCookie("accessToken", {
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json("User has been logged out.");
  };

  static browse = (req, res) => {
    models.user
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
}
module.exports = UserController;

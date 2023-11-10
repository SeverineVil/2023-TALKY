const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "User not logged in!" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_AUTH_SECRET);
    req.user = user;
    if (user) {
      return next();
    }
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ error: "Token invalide" });
  }
  return undefined;
};

module.exports = { authorization };

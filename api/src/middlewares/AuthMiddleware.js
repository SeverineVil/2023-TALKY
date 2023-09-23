const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const accessToken = req.header("Authorization").split(" ")[1]; // .replace('bearer ', "");
  console.warn("Access token from header:", accessToken);

  if (!accessToken) {
    console.warn("User not logged in!");
    return res.status(401).json({ error: "User not logged in!" });
  }

  try {
    const validToken = jwt.verify(accessToken, process.env.JWT_AUTH_SECRET);
    req.user = validToken;
    if (validToken) {
      console.warn("le token est valide");
      return next();
    }
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ error: "Token invalide" });
  }
  return undefined;
};

module.exports = { authorization };

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  let token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied, no token provided");

  try {
    const decodedToken = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decodedToken; // storing it in the request to use it fast if needed
    next();
  } catch {
    res.status(400).send("Invalid token");
  }
};

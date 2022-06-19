const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  const authToken = authHeader.split(" ")[1];
  if (authHeader) {
    jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(500).json(err);
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("jwt token not provided");
  }
};

module.exports = verifyToken;

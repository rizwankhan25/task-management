const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log("Error: ", err)
        return res.sendStatus(403); // Invalid token
      }

      req.user = user;    
      next();
    });
  } else {
    res.sendStatus(401); // No token provided
  }
};

module.exports = authenticateJWT;
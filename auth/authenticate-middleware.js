const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authError = {
    message: "Invalid credentials",
  };

  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json(authError);
    }

    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        return res.status(401).json(authError);
      }

      next();
    });
  } catch (err) {
    next(err);
  }
};

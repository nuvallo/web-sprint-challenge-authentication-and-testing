/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authError = {
    message: "Invalid credentials",
  };

  try {
    const token = req.cookies.token;
    console.log("token: ", token);
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

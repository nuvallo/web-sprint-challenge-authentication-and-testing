const router = require("express").Router();
const db = require("../database/dbConfig");

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // if (username) {
    //   res.status(401).json({ message: "Username already taken" });
    // }

    const newUser = {
      username: username,
      password: password,
    };

    const user = await db("users").insert(newUser);

    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;

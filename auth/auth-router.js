const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

    const hashed = await bcrypt.hash(password, 10);

    newUser.password = hashed;

    const user = await db("users").insert(newUser);

    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await db("users")
      .select("id", "username", "password")
      .where("username", username)
      .first();

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(501).json({
        message: "Invalid Credentials",
      });
    }

    const payload = {
      userId: user.id,
      username: user.username,
    };

    res.cookie("token", jwt.sign(payload, process.env.JWT_SECRET));

    console.log(res.cookie("token", jwt.sign(payload, process.env.JWT_SECRET)));

    res.status(200).json(`welcome ${user.username}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

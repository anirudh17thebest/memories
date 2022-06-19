const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//register a user
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      username: req.body.username,
      password: hashpass,
      email: req.body.email,
    });

    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("invalid credentials");

    const password = await bcrypt.compare(req.body.password, user.password);
    !password && res.status(401).json("invalid credentials");

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({
      id: user._id,
      username: user.username,
      token: token,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const verifyToken = require("../middleware/verifyToken");

//update a user
router.put("/:id", verifyToken, async (req, res) => {
  if (req.body.id === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const og_user = await User.findById(req.params.id);
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      await Post.updateMany(
        { username: og_user.username },
        {
          username: user.username,
        }
      );
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(401).json("you can only update your own profile");
  }
});

//delete user
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.body.id === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json("delted successfully");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("user does not exist");
    }
  } else {
    return res
      .status(401)
      .json("you are only allowed to delete your own profile");
  }
});

module.exports = router;

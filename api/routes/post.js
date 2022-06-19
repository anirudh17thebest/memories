const router = require("express").Router();
const Post = require("../models/Post");
const verifyToken = require("../middleware/verifyToken");

//create a new post
router.post("/", verifyToken, async (req, res) => {
  try {
    const post = new Post(req.body);
    const newPost = await post.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all post or post of a particular user
router.get("/", async (req, res) => {
  const user = req.query.user;
  let posts;
  try {
    if (user) {
      posts = await Post.find({ username: user });
      return res.status(200).json(posts);
    }

    const allPost = await Post.find();
    res.status(200).json(allPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//fetch a particular post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a post
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.username === post.username) {
      try {
        const newPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );

        res.status(200).json(newPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      return res.status(401).json("You can only update your own post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.username === post.username) {
      try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      return res.status(401).json("You can only delete your own post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

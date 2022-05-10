const express = require("express");
const postRouter = express.Router();

postRouter.get("/getposts", (req, res) => {
  const posts = [
    { title: "Post 1", body: "This is a post" },
    { title: "Post 2", body: "This is also a post" },
  ];
  res.status(200).json({ posts });
});

postRouter.post("/newpost", (req, res) => {
  console.log("post to add: ", req.body);
  res.status(200).json({ msg: `Added post: ${req.body.title}` });
});

postRouter.put("/updatepost/:id", (req, res) => {
  console.log("post to update: ", req.body);
  console.log("Post ID", req.params.id);
  res.status(200).json({ msg: `Updated post: ${req.params.id}` });
});

postRouter.delete("/deletepost/:id", (req, res) => {
  console.log("Post ID", req.params.id);
  res.status(200).json({ msg: `Deleted post: ${req.params.id}` });
});

module.exports = postRouter;

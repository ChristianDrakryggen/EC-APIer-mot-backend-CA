const express = require("express");
const postRouter = express.Router();
const Post = require("../models/Post");

//get posts
postRouter.get("/getposts", (req, res) => {
  /*const posts = [
    { title: "Post 1", body: "This is a post" },
    { title: "Post 2", body: "This is also a post" },
  ];
  res.status(200).json({ posts });*/
  Post.find({}, (err, documents) => {
    if (err) {
      res.status(500).json({
        msg: {
          msgBody: "An error occured while retrieving posts",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({ posts: documents });
    }
  });
});

//add post
postRouter.post("/newpost", (req, res) => {
  console.log("post to add: ", req.body);
  //res.status(200).json({ msg: `Added post: ${req.body.title}` });
  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
  });
  newPost.save((err) => {
    if (err) {
      res.status(500).json({
        msg: {
          msgBody: "An error occured while saving post",
          msgError: true,
        },
      });
    } else {
      res.status(201).json({
        msg: {
          msgBody: "Post was saved",
          msgError: false,
        },
      });
    }
  });
});

//update post
postRouter.put("/updatepost/:id", (req, res) => {
  /*console.log("post to update: ", req.body);
  console.log("Post ID", req.params.id);
  res.status(200).json({ msg: `Updated post: ${req.params.id}` });*/
  Post.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, body: req.body.body },
    (err) => {
      if (err) {
        res.status(500).json({
          msg: {
            msgBody: "An error occured while updating post",
            msgError: true,
          },
        });
      } else {
        res.status(200).json({
          msg: {
            msgBody: "Post was updated",
            msgError: false,
          },
        });
      }
    }
  );
});

//delete post
postRouter.delete("/deletepost/:id", (req, res) => {
  /*console.log("Post ID", req.params.id);
  res.status(200).json({ msg: `Deleted post: ${req.params.id}` });*/
  Post.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({
        msg: {
          msgBody: "An error occured while deleting post",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({
        msg: {
          msgBody: "Post was deleted",
          msgError: false,
        },
      });
    }
  });
});

module.exports = postRouter;

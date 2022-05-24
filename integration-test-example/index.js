const express = require("express");
const app = express();

//middleware
app.use(express.json());

app.get("/posts", (req, res) => {
  const posts = [
    {
      title: "Post one",
      content: "A post",
    },
    {
      title: "Post two",
      content: "Another post",
    },
  ];
  res.status(200).json({ posts });
});

app.post("/posts", (req, res) => {
  res.status(200).json({ msg: "Success" });
});

module.exports = app;

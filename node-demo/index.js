const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  console.log(req.url);
  //res.writeHead(200, { "Content-Type": "text/html" });
  //res.end("<h1>Hello</h1>");
  /*if (req.url === "/") {
    fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }
  if (req.url === "/about") {
    fs.readFile(path.join(__dirname, "public", "about.html"), (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }
  //api endpoint example
  if (req.url === "/api/users") {
    const users = [
      {
        name: "Christian",
        age: 31,
      },
      {
        name: "Carl",
        age: 29,
      },
    ];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  }*/

  //Dynamic server

  //dynamic filepath
  let filepath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : `${req.url}.html`
  );

  fs.readFile(filepath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, data) => {
          if (err) throw err;
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(data);
        });
      } else {
        res.writeHead(500);
        res.end("Server error");
      }
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is running at ${PORT}`));

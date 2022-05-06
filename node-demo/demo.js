//import person from "./person.js";
//const person = require("./person");
const path = require("path");
const fs = require("fs");
const http = require("http");

//console.log(person);

//-------------node core modules

//cureent file
/*console.log(__filename);

//current directory
console.log(__dirname);

//-------------Path module methods

//basename - gets filename
console.log(path.basename(__filename));

//dirname - gets directory name
console.log(path.dirname(__filename));

//extname - gets the extention (filetype) of file
console.log(path.extname(__filename));

//parse - creates a path object from the path of the specified file
console.log(path.parse(__filename));

//join - concatenates paths
console.log(path.join(__dirname, "test", "hello.html"));*/

//---------------Filsysytem (fs) module methods

//mkdir - creates a folder
/*fs.mkdir(path.join(__dirname, "test"), {}, (err) => {
  if (err) throw err;
  console.log("Folder created");
});*/

//writeFile - creates file and writes to it
/*fs.writeFile(
  path.join(__dirname, "test", "hello.txt"),
  "Nejsan hoppsan tjosan",
  (err) => {
    if (err) throw err;
    console.log("Created and wrote to file");
  }
);*/

//appendFile - adds content to existing file
/*fs.appendFile(
  path.join(__dirname, "test", "hello.txt"),
  " lillebror",
  (err) => {
    if (err) throw err;
    console.log("Appended new text to file");
  }
);*/

//readFile - reads content from file
/*fs.readFile(path.join(__dirname, "test", "hello.txt"), "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});*/

//rename - Renames a file
/*fs.rename(
  path.join(__dirname, "test", "hello.txt"),
  path.join(__dirname, "test", "helloWorld.txt"),
  (err) => {
    if (err) throw err;
    console.log("Renamed file");
  }
);*/

//--------------Http module

//createServer - Creates a server object
http
  .createServer((req, res) => {
    res.write("Hello from my first server");
    res.end();
  })
  .listen(5001, () => console.log("Server is up and running"));

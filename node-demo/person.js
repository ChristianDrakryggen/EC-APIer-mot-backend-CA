const { v4: uuidv4 } = require("uuid");

const person = {
  id: uuidv4(),
  fName: "Christian",
  age: 31,
};

//export default person
module.exports = person;

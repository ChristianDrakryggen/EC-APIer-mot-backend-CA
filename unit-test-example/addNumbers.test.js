const addNumbers = require("./addNumbers");

test("add numbers to return a sum", () => {
  expect(addNumbers(1, 2)).toBe(3);
});

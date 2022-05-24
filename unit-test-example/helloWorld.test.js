const helloWorld = require("./helloWorld");

describe("test suite for helloWorld function", () => {
  //type test
  test("check that helloWorld is of type function", () => {
    expect(typeof helloWorld).toBe("function");
  });

  //content test
  test("returns the string Hello World!", () => {
    expect(helloWorld()).toBe("Hello World!");
  });

  //content test
  test("check that returned value is a string", () => {
    expect(typeof helloWorld()).toBe("string");
  });
});

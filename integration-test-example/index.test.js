const request = require("supertest");
const app = require("./index");

describe("test suite for api endpoints", () => {
  //get 200 status code
  test("GET /posts - return 200 status code", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
  });

  //get response body
  test("GET /posts - response body contains specific content", async () => {
    const { body } = await request(app).get("/posts");
    expect(body).toEqual({
      posts: [
        {
          title: "Post one",
          content: "A post",
        },
        {
          title: "Post two",
          content: "Another post",
        },
      ],
    });
  });

  //post status code
  test("POST /posts - 200 status code", async () => {
    const response = await request(app).post("/posts").send({
      title: "A post",
      content: "post data",
    });
    expect(response.statusCode).toBe(200);
  });

  //post response content type
  test("POST /posts - make sure response content-type is json", async () => {
    const response = await request(app).post("/posts").send({
      title: "A post",
      content: "post data",
    });
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});

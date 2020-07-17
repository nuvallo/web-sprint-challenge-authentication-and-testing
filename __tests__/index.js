const supertest = require("supertest");
const server = require("../api/server");

describe("Authenication integration tests", () => {
  it("POST //api/auth/register", async () => {
    const res = await supertest(server).post("//api/auth/register").send({
      username: "test",
      password: "test",
    });
    expect(res.statusCode).toBe(201);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.body.id).toBeDefined();
    expect(res.body.username).toBe("test");
  });
});

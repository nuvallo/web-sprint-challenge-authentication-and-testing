const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

afterAll(async () => {
  await db.destroy();
});

describe("Authenication integration tests", () => {
  // Find out why db doesn't get destroyed
  it("POST /api/auth/register", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "test", password: "test" });
    expect(res.statusCode).toBe(201);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });
  it("POST /api/auth/login", async () => {
    // How to get .env to work correctly
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "test", password: "test" });
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });
});

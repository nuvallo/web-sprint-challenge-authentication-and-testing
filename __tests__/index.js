const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

afterAll(async () => {
  await db.destroy();
});

describe("Authenication integration tests", () => {
  it("POST /api/auth/register", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "test", password: "test" });
    expect(res.statusCode).toBe(201);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });
  it("POST /api/auth/login", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "test", password: "test" });
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.body).toBe("welcome test");
  });
  it("GET /jokers", async () => {
    const res = await supertest(server).get("/api/jokes");
    expect(res.statusCode).toBe(401);
  });
});

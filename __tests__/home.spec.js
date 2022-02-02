import request from "supertest";
import app from "../app.js";
import "regenerator-runtime";

test("the status code should be 200 from home url", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(200);
});

test("the status code should be 404 from random url", async () => {
  const response = await request(app).get("/foo");
  expect(response.status).toBe(404);
});

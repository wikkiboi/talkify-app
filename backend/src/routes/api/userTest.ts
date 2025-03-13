import request from "supertest";
import {server} from "./app";
import "jest";

describe("User API", () => {
  it("should get user details", async () => {
    const res = await request(app).get("/api/user/me");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("username");
  });

  it("should get user spaces", async () => {
    const res = await request(app).get("/api/user/spaces");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("spaces");
  });

  it("should get last visited space", async () => {
    const res = await request(app).get("/api/user/1/lastVisited");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("lastVisited");
  });

  it("should update last visited space", async () => {
    const res = await request(app).put("/api/user/1/lastVisited");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Last visited space updated" });
  });
});

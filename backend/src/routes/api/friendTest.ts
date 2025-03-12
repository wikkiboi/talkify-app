import request from "supertest";
import {server} from "./app";
import "jest";

describe("Friend API", () => {
  it("should get all friends", async () => {
    const res = await request(app).get("/api/friend/me");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("friends");
  });

  it("should send a friend request", async () => {
    const res = await request(app).post("/api/friend/123/request");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Friend request sent" });
  });

  it("should add a friend", async () => {
    const res = await request(app).put("/api/friend/123/add");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Friend added successfully" });
  });

  it("should remove a friend", async () => {
    const res = await request(app).delete("/api/friend/123/remove");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Friend removed successfully" });
  });
});

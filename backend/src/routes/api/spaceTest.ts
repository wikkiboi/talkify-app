import request from "supertest";
import {server} from "./app";
import "jest";

describe("Space API", () => {
  let spaceId: string;

  it("should create a new space", async () => {
    const res = await request(app).post("/api/space/create").send({
      name: "Test Space", color: "#123456"
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    spaceId = res.body.id;
  });

  it("should retrieve a space", async () => {
    const res = await request(app).get(`/api/space/${spaceId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name");
  });

  it("should update a space", async () => {
    const res = await request(app).put(`/api/space/${spaceId}/update`).send({
      name: "Updated Space"
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Space updated successfully" });
  });

  it("should delete a space", async () => {
    const res = await request(app).delete(`/api/space/${spaceId}/delete`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Space deleted successfully" });
  });
});

import request from "supertest";
import {server} from "./app";
import "jest";

describe("Channel API", () => {
  let channelId: string;

  it("should create a new channel", async () => {
    const res = await request(app).post("/api/channel/1/create").send({
      name: "General"
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    channelId = res.body.id;
  });

  it("should get messages from a channel", async () => {
    const res = await request(app).get(`/api/channel/1/${channelId}/msgs`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("messages");
  });

  it("should send a message to a channel", async () => {
    const res = await request(app).post(`/api/channel/${channelId}/send`).send({
      message: "Hello World!"
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Message sent" });
  });

  it("should delete a channel", async () => {
    const res = await request(app).delete(`/api/channel/1/${channelId}/delete`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Channel deleted" });
  });
});

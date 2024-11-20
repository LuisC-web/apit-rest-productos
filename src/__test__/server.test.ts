import server from "../server";
import request from "supertest";

describe("GET /api", () => {
  it("should send back a json response", async () => {
    const res = await request(server).get("/api");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.msg).toBe("Desde api");
    expect(res.status).not.toBe(400);
    expect(res.headers["content-type"]).not.toMatch(/html/);
    expect(res.body.msg).not.toBe("desde api");
  });
});

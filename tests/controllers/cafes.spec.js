import request from "supertest";
import app from "../../index.js";
import { generateToken } from "../utils.js/login.js";
import { payloadTest } from "../utils.js/payloadTest.js";

describe("cafes controller", () => {
  describe("GET /cafes", () => {
    describe("Getting Cafes", () => {
      it("GET /cafes getting a state 200", async () => {
        const response = await request(app).get("/cafes");
        const status = response.statusCode;
        expect(status).toBe(200);
      });

      it("is instance of array", async () => {
        const response = await request(app).get("/cafes");
        const cafes = response.body;
        expect(cafes).toBeInstanceOf(Array);
      });

      it("array with information", async () => {
        const response = await request(app).get("/cafes");
        const cafes = response.body;
        expect(cafes.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe("DELETE /cafes/:id", () => {
    describe("Delete coffe by id", () => {
      it("Return 404", async () => {
        const jwt = "token";
        const response = await request(app)
          .delete(`/cafes/${payloadTest.cafe.id}`)
          .set("Authorization", jwt);
        const status = response.statusCode;
        expect(status).toBe(404);
      });
    });
  });

  describe("POST /cafes", () => {
    describe("Create new cafe", () => {
      it("return 201 ", async () => {
        const response = await request(app).post("/cafes").send(payloadTest);
        const status = response.statusCode;
        expect(status).toBe(201);
      });
      it("add new cofe", async () => {
        const response = await request(app).post("/cafes").send(payloadTest);
        expect(response.body).toBeInstanceOf(Object);
        console.log("post  ", payloadTest);
      });
    });
  });

  describe("PUT /cafes update with invalid params", () => {
    it("returns status code 400 when IDs mismatch", async () => {
      const invalidId = payloadTest.cafe.id + 1;
      const response = await request(app)
        .put(`/cafes/${invalidId}`)
        .send(payloadTest);
      expect(response.statusCode).toBe(400);
    });
  });
});

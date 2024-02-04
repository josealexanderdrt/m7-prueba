import request from "supertest";
import app from "../../server.js";
import { generateToken } from "../utils.js/login.js";
import { payloadTest, payloadTest2 } from "../utils.js/payloadTest.js";

describe("cafes controller", () => {
  describe("GET /cafes", () => {
    describe("Getting Cafes", () => {
      it("GET /cafes getting a state 200", async () => {
        const response = await request(app).get("/cafes");
        expect(response.status).toBe(200);
      });

      it("is instance of array", async () => {
        const response = await request(app).get("/cafes");
        const cafes = response.body;
        expect(cafes).toBeInstanceOf(Object);
      });

      it("Informacion", async () => {
        const response = await request(app).get("/cafes");
        const cafes = response.body.cafes;
        expect(cafes.length).toBeGreaterThan(1);
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
        const response = await request(app).post("/cafes").send(payloadTest2);
        expect(response.body).toBeInstanceOf(Object);
      });
    });
  });

  describe("PUT /cafes", () => {
    describe("Update cafe with Invalid ID", () => {
      const existingCafeId = 2;
      const data = {
        travel: {
          id: 1,
          nombre: "Prueba",
        },
      };
      it("Invalid ID", async () => {
        const response = await request(app)
          .put(`/cafes/${existingCafeId}`)
          .send(data);
        expect(response.statusCode).toBe(400);
      });
    });
  });
});

import { describe, it } from "mocha";
import { assert } from "chai";
import { Response } from "supertest";
const request = require("supertest")("http://localhost:4000");

describe("POST /api/car_value function", () => {
  it("should return the correct value for model Civic and year 2014", async () => {
    const input = { model: "Civic", year: 2014 };
    const output = { value: 6614 };
    const res: Response = await request.post("/api/car_value").send(input).expect(200);
    const responseBody = res.body as { value: number };
    assert.equal(responseBody.value, output.value);
  });

  it("should return the correct value for model Camry and year 2020", async () => {
    const input = { model: "Camry", year: 2020 };
    const output = { value: 8020 };
    const res: Response = await request.post("/api/car_value").send(input).expect(200);
    const responseBody = res.body as { value: number };
    assert.equal(responseBody.value, output.value);
  });

  it("should return an error message for missing model property", async () => {
    const input = { model: "", year: 2014 };
    const errorMessage = "Invalid input. Please provide a valid value for model and year.";

    const res: Response = await request.post("/api/car_value").send(input).expect(400);
    const responseBody = res.body;
    assert.equal(responseBody, errorMessage);
  });

  it("should return an error message for invalid model type", async () => {
    const input = { model: 123, year: 2014 };
    const errorMessage = "Invalid input. Please provide a valid value for model and year.";

    const res: Response = await request.post("/api/car_value").send(input).expect(400);
    const responseBody = res.body;
    assert.equal(responseBody, errorMessage);
  });

  it("should return an error message for invalid year property", async () => {
    const input = { model: "Civic", year: 0 };
    const errorMessage = "Invalid input. Please provide a valid value for model and year.";

    const res: Response = await request.post("/api/car_value").send(input).expect(400);
    const responseBody = res.body;
    assert.equal(responseBody, errorMessage);
  });

  it("should return an error message for invalid year type", async () => {
    const input = { model: "Civic", year: -2020 };
    const errorMessage = "Invalid input. Please provide a valid value for model and year.";

    const res: Response = await request.post("/api/car_value").send(input).expect(400);
    const responseBody = res.body;
    assert.equal(responseBody, errorMessage);
  });
});

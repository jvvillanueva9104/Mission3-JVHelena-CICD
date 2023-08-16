import { describe, it } from "mocha";
import { assert } from "chai";
import { Response } from "supertest";

const request = require("supertest")("http://localhost:4000");

describe("POST /api/risk_rating", () => {
  it("should return the correct risk rating for valid input", async () => {
    const input = { claimHistory: "I crashed a car by colliding into a car" };
    const output = { rate: 2 };
    const res: Response = await request.post("/api/risk_rating").send(input).expect(200);

    const responseBody = res.body;
    assert.equal(responseBody.rate, output.rate);
  });

  it("should return the correct value for valid input with bump, scratch & smash", async () => {
    const input = {
      claimHistory:
        "During the recent accident, my car suffered a minor scratch, a noticeable bump, and the front end got smashed.",
    };
    const output = { rate: 3 };
    const res: Response = await request.post("/api/risk_rating").send(input).expect(200);

    const responseBody = res.body;
    assert.equal(responseBody.rate, output.rate);
  });

  it("should return the correct value for valid input without keywords", async () => {
    const input = {
      claimHistory:
        "There are marks on the body and some dents, which I believe occurred due to the unexpected impact.",
    };
    const output = { rate: 1 };

    const res: Response = await request.post("/api/risk_rating").send(input).expect(200);
    const responseBody = res.body;
    assert.equal(responseBody.rate, output.rate);
  });

  it("should return an error message for missing claim history (only space)", async () => {
    const input = { claimHistory: "  " };
    const errorMessage = "Invalid input. Please provide a valid claim history.";

    const res: Response = await request.post("/api/risk_rating").send(input).expect(400);
    const responseBody = res.body;
    assert.equal(responseBody, errorMessage);
  });

  it("should return an error message for invalid claim history type", async () => {
    const input = { claimHistory: 123 };
    const errorMessage = "Invalid input. Please provide a valid claim history.";

    const res: Response = await request.post("/api/risk_rating").send(input).expect(400);
    const responseBody = res.body;
    assert.equal(responseBody, errorMessage);
  });
});

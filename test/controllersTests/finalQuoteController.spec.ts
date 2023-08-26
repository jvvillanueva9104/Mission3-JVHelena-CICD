import { describe, it } from "mocha";
import { expect } from "chai";
import request, { Response } from "supertest";
import { app } from "../../src/App";

describe("POST /api/final_quote", () => {
  it("should return the correct value for value 6641 and riskRate 5", async () => {
    const input = { value: 6614, rate: 5 };
    const output = { yearly: "330.70", monthly: "27.56" };
    const res: Response = await request(app).post("/api/final_quote").send(input).expect(200);

    const responseBody = res.body as { yearly: string; monthly: string };
    expect(responseBody.yearly).to.equal(output.yearly);
    expect(responseBody.monthly).to.equal(output.monthly);
  });

  it("should return the correct value for value 6641 and riskRate 5", async () => {
    const input = { value: 6200, rate: 5 };
    const output = { yearly: "310.00", monthly: "25.83" };
    const res: Response = await request(app).post("/api/final_quote").send(input).expect(200);

    const responseBody = res.body as { yearly: string; monthly: string };
    expect(responseBody.yearly).to.equal(output.yearly);
    expect(responseBody.monthly).to.equal(output.monthly);
  });

  it("should return an error message for zero car value input", async () => {
    const input = { value: 0, rate: 5 };
    const errorMessage = "Invalid input. Please provide a valid car value and risk rate.";

    const res: Response = await request(app).post("/api/final_quote").send(input).expect(400);
    const responseBody = res.body;
    expect(responseBody).to.equal(errorMessage);
  });

  it("should return an error message for zero riskRate value input", async () => {
    const input = { value: 6614, riskRate: 0 };
    const errorMessage = "Invalid input. Please provide a valid car value and risk rate.";

    const res: Response = await request(app).post("/api/final_quote").send(input).expect(400);
    const responseBody = res.body;
    expect(responseBody).to.equal(errorMessage);
  });

  it("should return an error message for invalid carValue(minus) input", async () => {
    const input = { value: -6614, riskRate: 5 };
    const errorMessage = "Invalid input. Please provide a valid car value and risk rate.";

    const res: Response = await request(app).post("/api/final_quote").send(input).expect(400);
    const responseBody = res.body;
    expect(responseBody).to.equal(errorMessage);
  });

  it("should return an error message for invalid riskRate(minus) input", async () => {
    const input = { value: 6614, riskRate: -5 };
    const errorMessage = "Invalid input. Please provide a valid car value and risk rate.";

    const res: Response = await request(app).post("/api/final_quote").send(input).expect(400);
    const responseBody = res.body;
    expect(responseBody).to.equal(errorMessage);
  });
});

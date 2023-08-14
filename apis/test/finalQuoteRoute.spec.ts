import { describe, it } from "mocha";
import { assert } from "chai";
import { Response } from "supertest";

const request = require("supertest")("http://localhost:4000");

/*-------------final quote API test---------------- */
describe("POST /api/final_quote", () => {
  /*-------------Test 1---------------- */
  // Test case 1: Valid input, expected output with a correct quote
  it("should return the correct value for value 6641 and riskRate 5", async () => {
    const input = { value: 6614, rate: 5 };
    const output = { yearly: 330, monthly: 27.5 };
    const res: Response = await request.post("/api/final_quote").send(input).expect(200);

    const responseBody = res.body as { yearly: number; monthly: number };
    assert.equal(responseBody.yearly, output.yearly);
    assert.equal(responseBody.monthly, output.monthly);
  });

  /*-------------Test 2---------------- */
  // Test case 2: Invalid input with zero risk rate value
  it("should return an error message for zero car value input", async () => {
    const input = { value: 0, rate: 5 };
    const errorMessage = "Invalid input. Please provide a valid car value and risk rate.";

    const res: Response = await request.post("/api/final_quote").send(input).expect(400);
    const responseBody = res.body
    assert.equal(responseBody, errorMessage);
  });

  /*-------------Test 3---------------- */
  // Test case 3: Invalid input with zero risk rate value
  it("should return an error message for zero riskRate value input", async () => {
    const input = { value: 6614, riskRate: 0 };
    const errorMessage = "Invalid input. Please provide a valid car value and risk rate.";

    const res: Response = await request.post("/api/final_quote").send(input).expect(400);
    const responseBody = res.body;
    assert.equal(responseBody, errorMessage);
  });

  /*-------------Test 4---------------- */
  // Test case 4: Invalid input with invalid value property
  it("should return an error message for invalid carValue(minus) input", async () => {
    const input = { value: -6614, riskRate: 5 };
    const errorMessage = "Invalid input. Please provide a valid car value and risk rate.";

    const res: Response = await request.post("/api/final_quote").send(input).expect(400);
    const responseBody = res.body
    assert.equal(responseBody, errorMessage);
  });

  /*-------------Test 5---------------- */
  // Test case 5: Invalid input with invalid risk rate property
  it("should return an error message for invalid riskRate(minus) input", async () => {
    const input = { value: 6614, riskRate: -5 };
    const errorMessage = "Invalid input. Please provide a valid car value and risk rate.";
    
    const res: Response = await request.post("/api/final_quote").send(input).expect(400);
    const responseBody = res.body
    console.log("Response Body:", responseBody);
    assert.equal(responseBody, errorMessage);
  });
});

import { getRates } from "../src/riskRating";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("getRate function", () => {
  // Test case 1: Valid input, expected output with claim history "collide crash"
  it("should return the correct value for valid input with collide & crash", () => {
    const input = { claimHistory: "I crashed a car by colliding into a car" };
    const output = { rate: 2 };

    expect(getRates(input)).to.deep.equal(output);
  });

  // Test case 2:Valid input, expected output with claim history "bump scratch smash"
  it("should return the correct value for valid input with bump, scratch & smash", () => {
    const input = {
      claimHistory:
        "During the recent accident, my car suffered a minor scratch, a noticeable bump, and the front end got smashed.",
    };
    const output = { rate: 3 };

    expect(getRates(input)).to.deep.equal(output);
  });

  // Test case 3:Valid input without keywords, expected output of riskRating 1
  it("should return the correct value for valid input without keywords", () => {
    const input = {
      claimHistory:
        "There are marks on the body and some dents, which I believe occurred due to the unexpected impact.",
    };
    const output = { rate: 1 };

    expect(getRates(input)).to.deep.equal(output);
  });

  // Test case 4: Invalid input with missing claim history (only space)
  it("should return an error message for missing claim history (only space)", () => {
    const input = { claimHistory: "  " };
    const errorMessage = "Invalid input. Please provide a valid claim history.";

    expect(getRates(input)).to.deep.equal(errorMessage);
  });

  //Test case 5: Invalid input with invalid claim history type
  it("should return an error message for invalid claim history type", () => {
    const input = { claimHistory: "123" };
    const errorMessage = "Invalid input. Please provide a valid claim history.";

    expect(getRates(input)).to.deep.equal(errorMessage);
  });
});

export default describe;

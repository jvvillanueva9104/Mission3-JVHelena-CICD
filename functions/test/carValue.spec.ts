import { describe, it } from "mocha";
import { carValue } from "../src/carValue";
import { expect } from "chai";

describe("carValue function", () => {
  it('should return the correct value for model "Civic" and year 2014', () => {
    const input = { model: "Civic", year: 2014 };
    const output = { value: 6614 };

    expect(carValue(input)).to.deep.equal(output);
  });

  it('should return the correct value for model "Camry" and year 2020', () => {
    const input = { model: "Camry", year: 2020 };
    const output = { value: 8020 };

    expect(carValue(input)).to.deep.equal(output);
  });

  it("should return an error message for missing model property", () => {
    const input = { model: "", year: 2014 };
    const errorMessage = "Invalid input. Please provide a valid value for model and year.";

    expect(carValue(input)).to.deep.equal(errorMessage);
  });

  it("should return an error message for invalid model type", () => {
    const input = { model: "123", year: 2014 };
    const errorMessage = "Invalid input. Please provide a valid value for model and year.";

    expect(carValue(input)).to.deep.equal(errorMessage);
  });

  it("should return an error message for invalid year property", () => {
    const input = { model: "Civic", year: 0 };
    const errorMessage = "Invalid input. Please provide a valid value for model and year.";

    expect(carValue(input)).to.deep.equal(errorMessage);
  });

  it("should return an error message for invalid year type", () => {
    const input = { model: "Civic", year: -2020 };
    const errorMessage = "Invalid input. Please provide a valid value for model and year.";

    expect(carValue(input)).to.deep.equal(errorMessage);
  });
});

export default describe;

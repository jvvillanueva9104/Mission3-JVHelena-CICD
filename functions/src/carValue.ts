export type CarInput = {
  model: string;
  year: number;
};

//carOutput structure
export type CarOutput = {
  value: number;
};

//
export function carValue({ model, year }: CarInput): CarOutput | string {
  // validate input value
  if (!model || typeof model !== "string" || !year || typeof year !== "number" || year <= 1885 || year >= 2024) {
    return "Invalid input. Please provide a valid value for model and year.";
  }

  const positions: number[] = model
    .toUpperCase() // change input value to upper case
    .replace(/[^A-Z]/g, "") // Remove non-alphabetic characters
    .split("") // split the string into array of individual character
    .map((char) => char.charCodeAt(0) - 64); // get the position of each letter
  
  if (positions.length === 0) {
    return "Invalid input. Please provide a valid value for model and year.";
  }
  
  const totalValue: number = positions.reduce((sum, position) => sum + position, 0); //sum up the value using reduce

  const carValue: number = totalValue * 100 + year; //get car value by multiply * 1000 + year

  return {
    value: carValue,
  };
}


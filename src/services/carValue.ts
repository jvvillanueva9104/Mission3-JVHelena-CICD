export type CarInput = {
  model: string;
  year: number;
};

export type CarOutput = {
  value: number;
};

export function carValue({ model, year }: CarInput): CarOutput | string {
  if (!model || typeof model !== "string" || !year || typeof year !== "number" || year <= 1885 || year >= 2024) {
    return "Invalid input. Please provide a valid value for model and year.";
  }

  const positions: number[] = model
    .toUpperCase() 
    .replace(/[^A-Z]/g, "") 
    .split("") 
    .map((char) => char.charCodeAt(0) - 64);
  
  if (positions.length === 0) {
    return "Invalid input. Please provide a valid value for model and year.";
  }
  
  const totalValue: number = positions.reduce((sum, position) => sum + position, 0);

  const carValue: number = totalValue * 100 + year;

  return {
    value: carValue,
  };
}


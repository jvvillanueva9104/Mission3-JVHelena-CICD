export type ClaimInput = {
  claimHistory: string | number;
};

export type RatingOutput = {
  rate: number;
};

export function getRates({ claimHistory }: ClaimInput): RatingOutput | string {
  if (!claimHistory || typeof claimHistory !== "string") {
    return "Invalid input. Please provide a valid claim history.";
  }

  const keywords = [
    "collide",
    "colliding",
    "collided",
    "crash",
    "crashed",
    "crashing",
    "scratch",
    "scratching",
    "scratched",
    "bump",
    "bumbing",
    "bumped",
    "smash",
    "smashing",
    "smashed",
  ];

  const findKeywords = claimHistory
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, " ")
    .split(" ");

  if (findKeywords.length === 0 || findKeywords[0] === "") {
    return "Invalid input. Please provide a valid claim history.";
  }

  const findMatch = findKeywords.filter((word) => keywords.includes(word));

  const riskRating = Math.max(1, Math.min(findMatch.length, 5));

  const ratingOutput: RatingOutput = {
    rate: riskRating,
  };

  return ratingOutput;
}


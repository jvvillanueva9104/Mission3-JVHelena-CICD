import { Request, Response } from "express";
import { pool } from "../pool/pool";
import { getRates, ClaimInput, RatingOutput } from "../services/riskRating";


export const riskRatingController = async (req: Request, res: Response) => {
  try {
    const { claimHistory } = req.body as ClaimInput;
    if (!claimHistory || typeof claimHistory !== "string" || claimHistory.trim().length === 0) {
      return res.status(400).json("Invalid input. Please provide a valid claim history.");
    }

    const rateValueResult = getRates({ claimHistory }) as RatingOutput;

    const queryResult = await pool.query("INSERT INTO car_insurance_table (claim, rate) VALUES (?, ?)", [
      claimHistory,
      rateValueResult.rate,
    ]);

    const response: RatingOutput | string = rateValueResult;

    res.json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};



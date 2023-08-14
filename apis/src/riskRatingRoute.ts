import express, { Request, Response } from "express";
import { createPool } from "mysql2/promise";
require("dotenv").config();

const pool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const riskRatingRouter = express.Router();

/* -----------API 2. risk rating-------------------------- */
//import get Rates function and types
import { getRates, ClaimInput, RatingOutput } from "../../functions/src/riskRating";

//riskRating endpoint "/api/risk_rating"
riskRatingRouter.post("/api/risk_rating", async (req: Request, res: Response) => {
  try {
    const { claimHistory } = req.body as ClaimInput;
    if (!claimHistory || typeof claimHistory !== "string") {
      return res.status(400).json("Invalid input. Please provide a valid claim history.");
    }

    const rateValueResult = getRates({ claimHistory });

    if (typeof rateValueResult === "number") {
      const queryResult = await pool.query("INSERT INTO car_insurance_table (claim, rate) VALUES (?, ?)", [
        claimHistory,
        rateValueResult,
      ]);
    }

    const response: RatingOutput | string = rateValueResult;

    res.json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export { riskRatingRouter };

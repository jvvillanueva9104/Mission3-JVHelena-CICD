import { Request, Response } from "express";
import {pool} from "../pool/pool"
import { finalQuote, ValueInput, QuoteOutput } from "../services/finalQuote";

export const finalQuoteController = async (req: Request, res: Response) => {
  try {
    const { value, rate } = req.body as ValueInput;
    if (!value || typeof value !== "number" || value <= 0 || !rate || typeof rate !== "number" || rate <= 0) {
      return res.status(400).json("Invalid input. Please provide a valid car value and risk rate.");
    }

    const quoteResult = finalQuote({ value, rate });
    const response: QuoteOutput | string = quoteResult;
    const { yearly, monthly } = response as QuoteOutput;

    const queryResult = await pool.query(
      "INSERT INTO car_insurance_table (value,rate,yearly,monthly) VALUES (?,?,?,?)",
      [value, rate, yearly, monthly]
    );
    res.json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


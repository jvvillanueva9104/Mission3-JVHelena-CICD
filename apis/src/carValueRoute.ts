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


const carValueRouter = express.Router();

/* -----------API 1. car value-------------------------- */
//import carValue function and types
import { carValue, CarInput, CarOutput } from "../../functions/src/carValue";

// carValue endpoint "/api/car_value"
carValueRouter.post("/api/car_value", async (req: Request, res: Response) => {
  try {
    const { model, year } = req.body as CarInput;
    if (!model || typeof model !== "string" || !year || typeof year !== "number" || year <= 0) {
      return res.status(400).json("Invalid input. Please provide a valid value for model and year.");
    }

    const carValueResult = carValue({ model, year });

    if (typeof carValueResult === "number") {
      const queryResult = await pool.query("INSERT INTO car_insurance_table (model, year, value ) VALUES (?, ?, ?)", [
        model,
        year,
        carValueResult,
      ]);
    }
    const response: CarOutput | string = carValueResult;

    res.json(response);
  } catch (error) {
    res.status(400).json({ error} );
  }
});

export {carValueRouter}
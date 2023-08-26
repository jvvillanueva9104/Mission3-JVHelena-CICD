import express from "express";
import { carValueController  } from "../controllers/carValueController";
import { riskRatingController } from "../controllers/riskRatingController";
import { finalQuoteController } from "../controllers/finalQuoteController";

const router = express.Router();

router.post("/api/car_value", carValueController);
router.post("/api/risk_rating", riskRatingController);
router.post("/api/final_quote", finalQuoteController);

export default router;

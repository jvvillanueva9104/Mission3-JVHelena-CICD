// Imports
const express = require("express");
const cors = require("cors");
import { carValueRouter } from "./carValueRoute";
import { riskRatingRouter } from "./riskRatingRoute";
import { finalQuoteRouter } from "./finalQuoteRoute";

// //Enable express
const app = express();

//env file
require("dotenv").config();

// Middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use(carValueRouter)
app.use(riskRatingRouter);
app.use(finalQuoteRouter);

const port = process.env.PORT;
app
  .listen(port, () => console.log(`Server listening at http://localhost:${port}`))
  .on("error", (error: any) => console.error(error));

  export {app}
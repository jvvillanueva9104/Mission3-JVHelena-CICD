import express, { Express } from "express";
const cors = require("cors");
import router from "./routes/index";

// //Enable express
const app = express();

//env file
require("dotenv").config();

// Middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use(router)

const port = process.env.PORT;
app
  .listen(port, () => console.log(`Server listening at http://localhost:${port}`))
  .on("error", (error: any) => console.error(error));

  export {app}
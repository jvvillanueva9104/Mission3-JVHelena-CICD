import express, { Express } from "express";
const cors = require("cors");
import router from "./routes/index";

const app = express();

require("dotenv").config();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use(router)

const port = process.env.PORT;
app
  .listen(port, () => console.log(`Server listening at http://localhost:${port}`))
  .on("error", (error: any) => console.error(error));

  export {app}
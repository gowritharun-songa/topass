import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import router from "./routes/routes.js";
import connectDB from './config/db.js';

import {loginUser} from "./controllers/login.js";

// Middleware imports
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";


dotenv.config({
  quiet: true
});

const app = express();

const PORT = process.env.PORT || 5050;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(errorHandler);
app.use("/api/users", router);
app.post("/api/login", loginUser);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started running on PORT: ${PORT}`);
  });
});
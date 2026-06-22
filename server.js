
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routes/routes.js";
import connectDB from './config/db.js';

// Middlewares
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

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started running on PORT: ${PORT}`);
  });
});

// Basically we need 4 api end points
/*
     GET --> /api/users => return all the users
     GET --> /api/users/:id => return 1 user
     POST -> /api/users => upload new User
     PATCH -> /api/users => just update the name
     PUT -> /api/users -> rename everything
     DELETE -> /api/users -> delete that thing
 */
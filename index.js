import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRouter.js";
import storyRouter from "./routes/storyRouter.js";

const PORT = process.env.PORT || 8081;

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.use("/api/v1/story", storyRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("server running on port : ", PORT);
    });
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("Cannot connect to mongodb : ", err);
  });

import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";

// Configure env
dotenv.config();

// Database Config
connectDB();

// Rest Object
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Rest API
app.get("/", (req, res) => {
  res.send({
    message: "XYZ 1",
  });
});

// PORT
const PORT = process.env.PORT || 8080;

// Listen App
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.bgCyan.white);
});

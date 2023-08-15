import express from "express";
import dotenv from "dotenv";
import colors from "colors";

// Configure env
dotenv.config();

// Rest Object
const app = express();

// Rest API
app.get("/", (req, res) => {
  res.send({
    message: "XYZ 1",
  });
});

// PORT
const PORT = process.env.PORT || 8081;

// Listen App
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.bgCyan.white);
});

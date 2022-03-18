const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const reviewsRouter = require("./controllers/reviews");

const url = "mongodb://mongo:27017/books";
console.log(`connecting to ${url}`);

mongoose
  .connect(url)
  .then((res) => console.log("connected to MongoDB"))
  .catch((err) => console.log(`error connecting to MongoDB: ${err.message}`));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/books", reviewsRouter);

module.exports = app;

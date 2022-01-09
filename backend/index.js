const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const cors = require("cors");

const uri = "mongodb://mongo:27017/books";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
      console.log("ne dela");
    } else {
      console.log("dela, se je povezalo");
    }
  }
);

const Book = mongoose.model("Book", {
  title: { type: String },
  review: { type: String },
});

app.post("/save", (req, res) => {
  console.log(req.body);
  const newBook = new Book(req.body);
  newBook.save((err, result) => {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.delete("/delete", (req, res) => {
  Book.deleteOne({ _id: mongodb.ObjectId(req.body.id) }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  res.send("deleted");
});

app.get("/all", (req, res) => {
  Book.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});

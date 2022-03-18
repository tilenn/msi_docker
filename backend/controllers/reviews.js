const reviewsRouter = require("express").Router();
const Review = require("../models/review");

reviewsRouter.post("/save", (req, res) => {
  const newBook = new Review(req.body);
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

reviewsRouter.delete("/delete", (req, res) => {
  Review.findByIdAndRemove(req.body.id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  res.send("deleted");
});

reviewsRouter.get("/all", (req, res) => {
  Review.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = reviewsRouter;

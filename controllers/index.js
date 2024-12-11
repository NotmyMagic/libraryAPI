const { response } = require("express");
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const testFunction =
  ("/",
  (req, res) => {
    res.send("Hello World");
  });

const routeCheck =
  ("/test",
  (req, res) => {
    res.send("Test says Hi!");
  });

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("books").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get specific book
const getOneBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("books")
      .find({ _id: bookId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// create book
const createBook = async (req, res) => {
  try {
    const books = {
      Title: req.body.Title,
      Author: req.body.Author,
      Series: req.body.Series,
      Pages: req.body.Pages,
      SeriesNumber: req.body.SeriesNumber,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("books")
      .insertOne(books);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred creating the book.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// update book
const updateBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const book = {
      Title: req.body.Title,
      Author: req.body.Author,
      Series: req.body.Series,
      Pages: req.body.Pages,
      SeriesNumber: req.body.SeriesNumber,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("books")
      .replaceOne({ _id: bookId }, book);
    if (response.acknowledged) {
      res.status(200).json(response);
    } else {
      res
        .status(500)
        .json(response.error || "Error occured while deleting book");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete book
const deleteBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("books")
      .deleteOne({ _id: bookId }, true);
    if (response.acknowledged) {
      res.status(200).json(response);
    } else {
      res
        .status(500)
        .json(response.error || "Error occured while deleting book");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// // Search books
// const searchBook = async (req, res) => {
//   try {
//     const locals = {
//       Title: "Search"
//     }
//   } catch (error) {
//     res.statuc(500).json(error);
//   }
// }

module.exports = {
  testFunction,
  routeCheck,
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteBook,
};

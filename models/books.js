const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const booksSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  Series: {
    type: String,
    required: true,
  },
  Pages: {
    type: Number,
    required: true,
  },
  SeriesNumber: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("books", booksSchema);

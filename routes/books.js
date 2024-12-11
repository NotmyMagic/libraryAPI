const express = require("express");
const router = express.Router();

const booksController = require("../controllers/index");

router.get("/", booksController.getAllBooks);

router.patch("/update/:id", booksController.updateBook);

router.delete("/delete/:id", booksController.deleteBook);

router.get("/:id", booksController.getOneBook);

router.post("/", booksController.createBook);

module.exports = router;

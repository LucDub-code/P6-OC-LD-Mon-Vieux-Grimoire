const express = require("express");
const router = express.Router();

const bookController = require("../controllers/book");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const sharp = require("../middlewares/sharp");

router.post("/", auth, multer, sharp, bookController.createBook);
router.post("/:id/rating", auth, bookController.addRating);
router.get("/", bookController.getAllBooks);
router.get("/bestrating", bookController.getBestRating);
router.get("/:id", bookController.getOneBook);
router.put("/:id", auth, multer, sharp, bookController.updateBook);
router.delete("/:id", auth, bookController.deleteBook);

module.exports = router;

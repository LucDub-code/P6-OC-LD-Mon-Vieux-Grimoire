const Book = require("../models/book");
const fs = require("fs");

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;

  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    ratings: [],
    averageRating: null,
  });

  book
    .save()
    .then(() => res.status(201).json({ message: "Livre enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.addRating = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) return res.status(404).json({ error: "Livre non trouvé" });

      const alreadyRated = book.ratings.some(
        (rating) => rating.userId === req.auth.userId
      );
      if (alreadyRated)
        return res.status(400).json({ error: "Vous avez déjà noté ce livre" });

      const rating = { userId: req.auth.userId, grade: req.body.rating };
      if (req.body.rating < 0 || req.body.rating > 5)
        return res
          .status(400)
          .json({ error: "La note doit être comprise entre 0 et 5" });
      book.ratings.push(rating);

      book.averageRating =
        book.ratings.reduce((sum, rating) => sum + rating.grade, 0) /
        book.ratings.length;

      book
        .save()
        .then((updatedBook) => res.status(200).json(updatedBook))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
};

exports.getBestRating = (req, res, next) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((bestBooks) => {
      res.status(200).json(bestBooks);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.updateBook = (req, res, next) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        return res.status(403).json({ message: "Unauthorized request" });
      }

      Book.updateOne({ _id: req.params.id }, { ...bookObject })
        .then(() => res.status(200).json({ message: "Livre modifié!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        return res.status(403).json({ message: "Unauthorized request" });
      }

      const filename = book.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Book.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Objet supprimé !" });
          })
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

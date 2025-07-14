const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.post('/', auth, multer, bookController.createBook);
router.post('/:id/rating', auth, bookController.addRating);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getOneBook);
router.put('/:id', auth, multer, bookController.updateBook);
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;
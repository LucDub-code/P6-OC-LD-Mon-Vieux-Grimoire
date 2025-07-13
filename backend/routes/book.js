const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.get('/', bookController.getAllBooks);
router.post('/', auth, multer, bookController.createBook);

module.exports = router;
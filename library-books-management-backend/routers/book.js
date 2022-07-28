const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');
const userController = require("../controllers/user");

router.use(userController.authorization);

router.post('/add', bookController.addNewBook);
router.get('', bookController.getAllBooks);
router.get('/:bookId', bookController.getBookById);
router.put('/:bookId', userController.adminAuthorization, bookController.updateBookById);
router.delete('/:bookId', userController.adminAuthorization, bookController.deleteBookById);


module.exports = router;

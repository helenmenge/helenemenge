const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrower');
const userController = require("../controllers/user");

router.use(userController.authorization);

router.post('/add',userController.userAuthorization,borrowerController.addNewBorrower);
router.get('',userController.adminAuthorization,borrowerController.getAllBorrowers);
router.get('/:userId', userController.adminAuthorization, borrowerController.getBorrowerById);
router.put('/:userId', userController.adminAuthorization, borrowerController.updateBorrowerById);
router.delete('/:userId', userController.adminAuthorization, borrowerController.deleteBorrowerById);


module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/signUp',userController.signUp);
router.post('/signin',userController.signin);
router.get('',userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.put('/:userId',userController.updateUserById);
router.delete('/:userId',userController.deleteUserById);

module.exports = router;
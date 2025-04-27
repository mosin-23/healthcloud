const express = require('express');
const { registerUser, loginUser, getAllUsers, getUserById } = require('../contoller/authController');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Admin or authorized route (for viewing all users)
router.get('/users', getAllUsers);
router.get('/user/:id',getUserById)

module.exports = router;

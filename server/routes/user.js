const express = require('express');
const { signup } = require('../controllers/user');

const router = express.Router();

router.post('/signup', signup);

// Add more routes for login, logout, etc.

module.exports = router;

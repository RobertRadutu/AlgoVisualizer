const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
        return res.status(403).json({
            error: 'Email is already in use!'
        });
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ message: 'Signup successful! Please login.' });
};

// Add more controllers for login, logout, etc.

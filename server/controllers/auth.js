// const jwt = require('jsonwebtoken');
// const expressJwt = require('express-jwt');

// exports.login = (req, res) => {
//     const { name, password } = req.body;
//     if (password === process.env.PASSWORD) {
//         // generate token and send to client/react
//         const token = jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: '100d' });
//         return res.json({ token, name });
//     } else {
//         return res.status(400).json({
//             error: 'Incorrect password!'
//         });
//     }
// };
const User = require('../models/user');
const jwt = require('jsonwebtoken');
// ...

exports.login = async (req, res) => {
    const { name, password } = req.body;
    try {
      // Find the user by name
      const user = await User.findOne({ name });
  
      // Check if the user exists and if the password is correct
      if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({ error: 'Invalid name or password' });
      }
  
      // Generate a token with the user's ID and send it as a response
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      res.cookie('token', token, { expiresIn: '1d' });
      res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  

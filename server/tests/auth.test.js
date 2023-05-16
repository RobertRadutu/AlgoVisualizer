const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/login', login);
const app = express();
app.use(express.json());
app.use(router);

beforeAll(async () => {
 
    await mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

   
    const user = new User({
        name: 'testUserLog',
        password: 'testPassword',
        email: 'test11@example.com',
    });
    await user.save();
});

test('It should login a user', async () => {
    const response = await request(app).post('/login').send({
        name: 'testUserLog',
        password: 'testPassword',
    });

    

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
});



afterAll(async () => {
  
    await User.deleteOne({ name: 'testUserLog' });

   
    await mongoose.connection.close();
});

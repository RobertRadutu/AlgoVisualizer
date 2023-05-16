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
        name: 'testUserW1',
        password: 'testPassword1',
        email: 'mailofuserW1@example.com',
    });
    await user.save();
});

test('It should not login a user with wrong password', async () => {
    const response = await request(app).post('/login').send({
        name: 'testUserW1',
        password: 'wrongPassword',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toEqual('Invalid name or password'); 
});



afterAll(async () => {

    await User.deleteOne({ name: 'testUserW1' });

  
    await mongoose.connection.close();
});
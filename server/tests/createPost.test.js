const request = require('supertest');
const express = require('express');
const router = express.Router();
const { create, update, remove } = require('../controllers/post');
const mongoose = require('mongoose');
const Post = require('../models/post');
require('dotenv').config();

router.post('/post', create);
router.put('/post/:slug', update);
router.delete('/post/:slug', remove);
const app = express();
app.use(express.json());
app.use(router);

beforeAll(async () => {
    
    await mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
});

test('It should create a post', async () => {
    const response = await request(app).post('/post').send({
        title: 'Test Post',
        content: 'This is a test post',
        user: 'newtestUser',
    });
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('title', 'Test Post');
    expect(response.body).toHaveProperty('content', 'This is a test post');
    expect(response.body).toHaveProperty('user', 'newtestUser');
});

afterAll(async () => {
 
    await Post.deleteOne({ title: 'Test Post' });

   
    await mongoose.connection.close();
});

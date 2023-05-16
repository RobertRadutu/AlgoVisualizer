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

test('It should delete a post', async () => {

    const postCreate = {
        title: "New origin Test Post",
        content: "This is a test post",
        user: '1testUser'
    };

    const postCreateResponse = await request(app).post('/post').send(postCreate);
    expect(postCreateResponse.statusCode).toBe(200);

    const response = await request(app).delete('/post/new-origin-test-post');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Post deleted');

    // Test if the post was actually deleted by trying to fetch it
    const getResponse = await request(app).get('/post/new-origin-test-post');
    expect(getResponse.statusCode).toBe(404);  
});


afterAll(async () => {
 
    await Post.deleteOne({ title: 'Test Post' });

   
    await mongoose.connection.close();
});

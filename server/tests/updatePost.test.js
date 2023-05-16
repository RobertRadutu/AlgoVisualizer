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

// afterEach(async () => {
//     await Post.deleteOne({ title: 'Hey there test post' });
// });

// test('It should update a post', async () => {
//     // Create a post first
//     const postCreate = {
//         title: "Hey there test post",
//         content: "This is a test post",
//         user: '1testUser'
//     };

//     const postCreateResponse = await request(app).post('/post').send(postCreate);
//     expect(postCreateResponse.statusCode).toBe(200);

//     // Now update the created post
//     const postUpdate = {
//         title: "Updated Test Post",
//         content: "This is an updated test post",
//         user: '1testUser'
//     };

//     const response = await request(app).put(`/post/${postCreateResponse.body.slug}`).send(postUpdate);
//     expect(response.statusCode).toBe(200);
//     expect(response.body.title).toEqual(postUpdate.title);
//     expect(response.body.content).toEqual(postUpdate.content);
// });

// afterAll(async () => {
 
//     await Post.deleteOne({ title: 'Hey there test post' });

   
//     await mongoose.connection.close();
// });
let postSlug;  // Declare variable at the top

test('It should update a post', async () => {
    // Create a post first
    const postCreate = {
        title: `Hey there test post ${Date.now()}`,
        content: "This is a test post",
        user: '1testUser'
    };
    
    const postCreateResponse = await request(app).post('/post').send(postCreate);
    expect(postCreateResponse.statusCode).toBe(200);

    postSlug = postCreateResponse.body.slug;  // Store the slug

    // Now update the created post
    const postUpdate = {
        title: "Updated Test Post",
        content: "This is an updated test post",
        user: '1testUser'
    };

    const response = await request(app).put(`/post/${postSlug}`).send(postUpdate);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toEqual(postUpdate.title);
    expect(response.body.content).toEqual(postUpdate.content);
});

afterEach(async () => {
    // Use the slug to delete the post
    if (postSlug) {
        await Post.deleteOne({ slug: postSlug });
        postSlug = null;
    }
});

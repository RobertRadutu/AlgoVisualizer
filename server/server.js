const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// import routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// app
const app = express();

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('DB connected');
        
        // middlewares
        app.use(cors());
        app.use(morgan('dev'));
        app.use(bodyParser.json());

        // route middleware
        app.use('/api', postRoutes);
        app.use('/api', authRoutes);
        app.use('/api', userRoutes);

        // port
        const port = process.env.PORT || 8889;
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    })
    .catch(err => console.log(err));
<<<<<<< HEAD
    
    module.exports = app; 
=======

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// route middleware
app.use('/api', postRoutes);
app.use('/api', authRoutes);

// port
const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
>>>>>>> d765ea9 (Added Unit Tests)

const express = require('express');
const mongoose = require('mongoose');
const LoginHandler = require('./LoginHandler');

// inti app from express constructor
const app = express();
app.use(express.json());

// database connection
// this is async, will  return promise
mongoose
    .connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })

    .then(() => {
        console.log('connected to database successfully');
    })

    .catch((err) => {
        console.log(err);
    });

// add router
// we can add more routers

app.use('/', LoginHandler);

// defaulf err handler

// add listener

app.listen(3000, () => {
    console.log('server listening at 3000...');
});

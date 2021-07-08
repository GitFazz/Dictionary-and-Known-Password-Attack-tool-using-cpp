/* eslint-disable new-cap */
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const LoginSchema = require('./LoginSchema');
// lets create a model from out login Schema

const Login = new mongoose.model('Login', LoginSchema);
// create a new username

router.post('/add', async (req, res) => {
    const newAdd = new Login(req.body);

    await newAdd.save((err) => {
        if (err) {
            res.status(500).json({
                error: 'Error in server!',
            });
        } else {
            res.status(200).json({
                message: 'New user created successfully',
            });
        }
    });
});

router.post('/login', async (req, res) => {
    const user = await Login.findOne({ username: req.body.username, password: req.body.password });
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(500).json();
    }
});

module.exports = router;

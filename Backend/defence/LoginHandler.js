/* eslint-disable new-cap */
const express = require('express');
const mongoose = require('mongoose');

const MAXIMUM_ATTEMPTS = 5;

const router = express.Router();
const LoginSchema = require('./LoginSchema');
// lets create a model from out login Schema

const Login = new mongoose.model('Login', LoginSchema);
// create a new username
router.post('/add', async (req, res) => {
    const newAdd = new Login({ ...req.body, loginAttempts: 0, lockUntil: new Date().getTime() });

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
    let user = await Login.findOne({ username: req.body.username });
    const date = new Date().getTime();
    if (user) {
        user = await Login.findByIdAndUpdate(
            { _id: user._id },
            {
                $set: {
                    loginAttempts: user.loginAttempts + 1,
                },
            }
        );

        if (user.loginAttempts == MAXIMUM_ATTEMPTS) {
            user = await Login.findByIdAndUpdate(
                { _id: user._id },
                {
                    $set: {
                        lockUntil: date + 9999,
                    },
                }
            );
            res.status(500).json({
                message: 'You are blocked, Try aftew few hours',
            });
        } else if (user.loginAttempts > MAXIMUM_ATTEMPTS) {
            if (date > user.lockUntil) {
                user = await Login.findByIdAndUpdate(
                    { _id: user._id },
                    {
                        $set: {
                            loginAttempts: 0,
                        },
                    },
                );
            }
            res.status(500).json({
                message: 'Try aftew few hours',
            });
        } else if (user.password === req.body.password) {
            res.status(200).json(user);
        } else {
            res.status(400).json({
                message: 'Wrong password',
            });
        }
    } else {
        res.status(400).json({
            message: 'User not found',
        });
    }
});

module.exports = router;

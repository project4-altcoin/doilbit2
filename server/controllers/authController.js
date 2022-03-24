const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require('../utils/errorResponse');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.signup = async (req, res, next) => {
    const newUser = await User.create(req.body);
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser,
            token
        }
    });
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide email and password'
        });
    }
    // 2) Check if user exist && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({
            status: 'fail',
            message: 'Incorrect email or password'
        });
    }
    // 3) If everything ok, send token to client
    const token = signToken(user._id);
    res.cookie('token', token, {
        expires: new Date(
            Date.now() + 1000 * 60 * 60 * 24 * 7
        ),
        httpOnly: true
    });
    res.status(200).json({
        status: 'success'
    });
}
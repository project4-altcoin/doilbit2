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
    const token = await signToken(user._id);
    res.cookie('token', token, {
        expires: new Date(
            Date.now() + 1000 * 60 * 60 * 24 * 7
        ),
        httpOnly: true
    }).catch(err => console.log(err));
    res.status(200).json({
        status: 'success'
    });
}

exports.isLoggedIn = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
        if (!token) {
            return next(new ErrorResponse('Not authenticated', 401));
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        const user = await User.findById(decoded._id);
    
        if (!user) {
            return next(new ErrorResponse('Not authenticated', 401));
        }
    
        req.user = user;
        next();
    });

exports.logOut = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({
        status: 'success',
        data: {}
    });
    }
);



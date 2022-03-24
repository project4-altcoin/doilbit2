const User = require('../models/userModel');

// user controller
exports.getAllUsers = (req, res, next) => {
    User.find()
        .then(users => {
            res.status(200).json({
                status: 'success',
                users
            });
        })
        .catch(err => {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        });
}

exports.getUser = (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'User not found'
                });
            }
            res.status(200).json({
                status: 'success',
                user
            });
        })
        .catch(err => {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        });
}

exports.createUser = (req, res, next) => {
    User.create(req.body)
        .then(user => {
            res.status(201).json({
                status: 'success',
                user
            });
        })
        .catch(err => {
            res.status(400).json({
                status: 'fail',
                message: err
            });
        });
}

exports.updateUser = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'User not found'
                });
            }
            res.status(200).json({
                status: 'success',
                user
            });
        })
        .catch(err => {
            res.status(400).json({
                status: 'fail',
                message: err
            });
        });
}

exports.deleteUser = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'User not found'
                });
            }
            res.status(200).json({
                status: 'success',
                user
            });
        })
        .catch(err => {
            res.status(400).json({
                status: 'fail',
                message: err
            });
        });
}
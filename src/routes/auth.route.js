var express = require('express');
var authRouter = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user.model.js');
var config = require('../config/db.js');
var bcrypt = require('bcrypt');

authRouter.post('/signup', function (req, res) {
    var user = new User(req.body);
    user.save(function (err, newUser) {
        if (err) res.status(500).send(err);
        res.send(newUser);
    });
});

authRouter.post('/login', function (req, res) {
    User.findOne({ userName: req.body.userName }, function (err, user) {
        if (err) res.status(500).send(err);
        if (!user) res.status(401).send('The username you entered does not exist.');
        else if (user) {
            bcrypt.compare(req.body.password, user.password, function (err, match) {
                if (err) throw (err);
                if (!match) {
                    res.status(401).send('The password doesn\'t match the username.');
                } else {
                    var token = jwt.sign(user, config.secret);
                    res.send({
                        user: user,
                        token: token
                    });
                }
            });
        }
    });
});

module.exports = authRouter;

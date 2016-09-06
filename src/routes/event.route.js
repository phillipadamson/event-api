var express = require('express');
var eventRouter = express.Router();
var Event = require('../models/event.model.js');

eventRouter.route('/')
    .get(function (req, res) {
        Event.find({
            user: req.user._doc._id
        })
        .sort({
            name: 'desc'
        })
        .exec(function (err, events) {
            if (err) res.status(500).send(err);
            res.send(events);
        });
    })
    .post(function (req, res) {
        var event = new Event(req.body);
        event.user = req.user._doc._id;
        event.save(function (err) {
            if (err) res.status(500).send(err);
            res.send(event);
        });
    });

eventRouter.route('/:eventId')
    .get(function (req, res) {
        Event.findOne({
            _id: req.params.eventId,
            user: req.user._doc._id
        }, function (err, event) {
            if (err) res.status(500).send(err);
            res.send(event);
        });
    })
    .put(function (req, res) {
        Event.findOneAndUpdate({
            _id: req.params.eventId,
            user: req.user._doc._id
        }, function (err, event) {
            if (err) res.status(500).send(err);
            res.send(event);
        });
    })
    .delete(function (req, res) {
        Event.findOneAndRemove({
            _id: req.params.eventId,
            user: req.user._doc._id
        }, function (err, event) {
            if (err) res.status(500).send(err);
            res.send(event);
        });
    });
module.exports = eventRouter;

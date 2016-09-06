var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = require('./user.model.js');


var eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    point: {
        type: [{
            time: {
                type: String,
                required: true
            },
            pointX: {
                type: String,
                required: true
            },
            pointY: {
                type: String,
                required: true
            },
            description: {
                type: String
            },
            images: {
                type: [String]
            }
        } ]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('Event', eventSchema);

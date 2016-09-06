var express = require('express');
var app = express();

var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('./config/db.js');
var cors = require('cors');

var db = mongoose.connect(config.dbLocation);

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Key');

    next();
});

var port = process.env.PORT || 5000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', expressJwt({
    secret: config.secret
}));
app.use('/api/event', require('./routes/event.route.js'));
app.use('/api/user', require('./routes/user.route.js'));
app.use('/auth', require('./routes/auth.route.js'));

app.listen(port, function () {
    console.log(`We are listening on port ${port}.`);
});



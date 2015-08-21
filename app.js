var express    = require('express');
var port       = process.env.PORT || 3000;
var path       = require('path');
var mongoose   = require('mongoose');
var passport   = require('passport');
var http       = require('http');
var flash      = require('connect-flash');
var favicon    = require('serve-favicon');
var logger     = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session    = require('express-session');
var multer  = require('multer');

var configDB = require('./config/database.js');

var app = express();

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

// Image upload ================================================================
app.use(multer({ dest: './public/uploads/images'}));

require('./config/login')(passport); // pass passport for configuration

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({ secret: 'triveniiiiramthiru#@$gf34' })); // session secret
app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Routes ======================================================================
require('./routes/login')(app, passport);
require('./routes/register')(app, passport);
require('./routes/profile')(app);
require('./routes/property-details')(app);
require('./routes/buyer-details')(app);
require('./routes/search')(app);
// Routes for buyer ============================================================
require('./routes/buyer-profile')(app);
require('./routes/looking-for')(app);
require('./routes/buyer-search')(app);
// Routes for seller ============================================================
require('./routes/seller-profile')(app);
require('./routes/seller-details')(app);
require('./routes/seller-search')(app);

// Elastic search ==============================================================


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

// launch ======================================================================
app.listen(port);
console.log('Your app is now running successfully ' + port);

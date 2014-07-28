/**
 * EHR System API server.
 * -Bo Hu 
 * 06/27/2014
 */

var env = process.env.NODE_ENV || 'development'

/**
 * Module dependencies.
 */
var express = require('express');
var path = require('path');
//var session = require('express-session');


var routes = require('./routes/index');
var users = require('./routes/users');
var mongoose = require('mongoose');
var passport = require('passport');
var models_path = __dirname + '/app/models'
require(models_path+'/'+'user.js')
//config app, env, db, root
config = require('./config/config')[env]

mongoose.connect(config.db);
//console.log(config.root);
var app = express();

require('./config/passport')(passport);

require('./config/express')(app, config, passport);
require('./config/routes')(app, passport);
//require('./config/routes')(app, passport)
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function(req, res){
//     console.log("sss")
//     res.json({message:'hello world'});
// });

/// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

/// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.json({message: err.message});
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


module.exports = app;

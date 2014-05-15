/// NPM deps
var express=    require('express');
var mongoose=   require('mongoose');
var bodyParser= require('body-parser');

// Utils
var l= require('./logger');

/// Confs
var db_cnfx = require('./conf/db');
/// App
var app = express();
app.use(express.static(__dirname + '/statics'));
app.use(bodyParser());
/// Routes
require('./routes')(app);

mongoose.connect( db_cnfx.url);

l.log('info', 'Up !');
app.listen(8083);

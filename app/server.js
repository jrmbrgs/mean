/// NPM deps
var express=    require('express');
var bodyParser= require('body-parser');

// Utils
var l= require('./logger');
/// App
var app = express();
app.use(express.static(__dirname + '/www'));
app.use(bodyParser());
/// Routes
require('./routes')(app);

l.log('info', 'Up !');
app.listen(8083);

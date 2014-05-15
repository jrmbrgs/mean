var express = require('express');
var app = express();
var mongoose = require('mongoose');
var winston = require('winston');

mongoose.connect('mongodb://node:n0d3!@localhost:27017/test');

app.use(express.static(__dirname + '/statics'));

var schema = new mongoose.Schema({ what: 'string', done: 'boolean' });
var todo = mongoose.model('todos', schema);

app.get('/api/todos', function(req, res) {
    winston.log('info', 'Fetching all todos...');
    todo.find({},null,null,function(err, todos) {
        if(err){
            res.send(err);
        }
        winston.log('info', todos.length);
        res.json(todos);
    });
});
app.post('/api/todos', function(req, res) {
    todo.create({
        what : req.body.what,
    	done : false
    }, function(err, todo) {
    	if(err){
    		res.send(err);
        }
    	todo.find(function(err, todos) {
    		if(err){
    			res.send(err);
            }
    		res.json(todos);
    	});
    });
});
app.delete('/api/todos/:todo_id', function(req, res) {
    todo.remove({
    	_id : req.params.todo_id
    }, function(err, todo){
    	if(err){
    		res.send(err);
        }
    	todo.find(function(err, todos){
    		if(err){
    			res.send(err);
            }
    		res.json(todos);
    	});
    });
});

/*
app.get('/foo/:foo_id', function(req, res) {
    if( typeof req.params.foo_id == 'undefined'){
        l.warn('Missing foo_id in req.params', req.params.foo_id );
    }
    res.setHeader('Content-Type', 'text/html');
    res.render('foo.ejs', req.params);
});
app.use(function(req, res, next){

    res.setHeader('Content-Type', 'text/plain');
    l.err('Page not found', req.url);
    res.send(404, 'Page introuvable !');
});
*/
app.get('*', function(req, res) {
		res.sendfile('./statics/index.html');
});


winston.log('info', 'Up !');
app.listen(8083);

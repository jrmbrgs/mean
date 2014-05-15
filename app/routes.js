/// Models
var winston=    require('winston');
var todo_md = require('./models/todo');

module.exports = function(app) {
    app.get('/api/todo', function(req, res) {
        winston.log('info', 'Fetching all todos...');
        todo_md.find({},null,null,function(err, todos) {
            if(err){
                res.send(err);
            }
            winston.log('info', todos.length);
            res.json(todos);
        });
    });
    app.post('/api/todo', function(req, res) {
        winston.log('info', 'Create todo : ' + req.body.what);
        todo_md.create({
            what : req.param('what'),
        	done : false
        }, function(err, todo) {
        	if(err){
        		res.send(err);
            }
        	todo_md.find(function(err, todos) {
        		if(err){
        			res.send(err);
                }
        		res.json(todos);
        	});
        });
    });
    app.delete('/api/todos/:todo_id', function(req, res) {
        winston.log('info', 'Remove todo : ' + req.params.todo_id);
        todo_m.remove({
        	_id : req.params.todo_id
        }, function(err, todo){
        	if(err){
        		res.send(err);
            }
        	todo_m.find(function(err, todos){
        		if(err){
        			res.send(err);
                }
        		res.json(todos);
        	});
        });
    });

    app.get('*', function(req, res) {
		res.sendfile('./statics/index.html');
    });
}

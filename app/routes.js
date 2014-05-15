/// Models
var winston=    require( 'winston');
require( './dbals/mongoose');
var todo_dm= require( './domains/todo');
var todo_md= require( './models/todo');

module.exports= function( app){
    var todo= new todo_dm();

    app.get( '/api/todos', function( req, res){
        todo.get( function(err, todo_xs){
            if(err) res.send(err);
            res.json(todo_xs);
        });
    });

    app.get( '/api/todos/not_done', function( req, res){
        todo.get_not_done( function(err, todo_xs){
            if(err) res.send(err);
            res.json(todo_xs);
        });
    });

    app.post('/api/todos', function( req, res){
        todo.create( req.body, function( err){
            if( err) res.send( err);
        });
    });

    app.put( '/api/todos/:todo_id', function( req, res){
        todo.update(req.params.todo_id, req.param('is_done'), function (err){
            if (err) return res.send(err);
        });
    });

    app.delete('/api/todos/:todo_id', function(req, res){
        winston.log('info', 'Remove todo : ' + req.params.todo_id);
        todo.delete( req.params.todo_id, function( err){
            if (err) return res.send(err);
        });
    });

    app.get('*', function(req, res){
		res.sendfile('./www/index.html');
    });
}

/// Models
var winston=    require( 'winston');
require( '../dbals/mongoose');
var todo_dm= require( '../domains/todo');

module.exports= function( app){
    var todo= new todo_dm();
    
    /// Routes
    app.get( '/api/todos', get_all_todo);
    app.get( '/api/todos/not_done', get_not_done_todo);
    app.get( '/api/todos/category/:category', get_todo_by_category);
    app.get( '/api/todos/:todo_id', get_todo);
    app.put( '/api/todos/:todo_id', update_todo);
    app.post( '/api/todos', create_todo);
    app.delete( '/api/todos/:todo_id', delete_todo);
    app.get('*', render_todo_ui);

    /// Render callbaks
    function handle_err( err, res){
        if( err){
            winston.error('todo/routes/err : %s ' + err);
            res.send(500, err);
        }
    }
    function render_todo( res, err, todo_xs){
        if(err) handle_err(err, res);
        if( ! todo_xs.length) res.send(404);
        else res.json(todo_xs);
    }

    /// Routes callbacks
    function get_todo( req, res){
        todo.get_by_id( req.params.todo_id, render_todo.bind(this, res));
    }
    function get_todo_by_category( req, res){
        todo.get_by_category( req.params.category, render_todo.bind(this, res));
    }
    function get_all_todo( req, res){
        todo.get( render_todo.bind(this, res));
    }
    function get_not_done_todo( req, res){
        todo.get_not_done( render_todo.bind(this, res));
    }

    function create_todo( req, res){
        todo.create( req.body, handle_err);
    }

    function update_todo( req, res){
        todo.update(req.params.todo_id, req.param('is_done'), handle_err);
    }

    function delete_todo(req, res){
        winston.info('Remove todo : %s', req.params.todo_id);
        todo.delete( req.params.todo_id, handle_err);
    }

    function render_todo_ui(req, res){
		res.sendfile('./www/index.html');
    }
}

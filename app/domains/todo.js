/* 
 *
 */

var winston=    require('winston');
require('../dbals/mongoose');
var model = require('../models/todo');

var todo_dm = function(){
}

todo_dm.prototype.create = function ( x, callback){
    winston.info('Creating todo item %s', x);
    ///xxx validate input
    var a_todo = new model();
    a_todo.what = x.what;
    a_todo.save( function(err){
        if(err){
            winston.error('Failed to fetch todo items : %s', err);
            callback( err);
        }
    });
}

todo_dm.prototype.get = function ( callback){
    winston.log('info', 'Fetching all todos...');
    model.find({}, null, null, function( err, xs){
        if(err){
            winston.error('Failed to fetch todo items : %s', err);
            callback( err, null);
        }
        winston.log('info', 'Found %s item(s)', xs.length);
        callback(null, xs);
    });
}
todo_dm.prototype.get_not_done = function ( callback){
    winston.log('info', 'Fetching all not done yet todos...');
    model.find({is_done:false}, null, null, function( err, xs){
        if(err){
            winston.error('Failed to fetch todo items : %s', err);
            callback( err, null);
        }
        winston.log('info', 'Found %s item(s)', xs.length);
        callback(null, xs);
    });
}


todo_dm.prototype.update = function ( id, is_done, callback){
    winston.info('Updating todo item %s status is_done:', id, is_done);
    ///xxx validate input
    model.update({ _id: id }, { is_done: is_done},function (err, numberAffected, raw){
        if(err){
            winston.error('Failed to update todo item %s : %s', id, err);
            callback( err);
        }
        winston.log('info', 'The number of updated documents was %d', numberAffected);
        winston.log('info', 'The raw response from Mongo was ', raw);
    });
}

todo_dm.prototype.delete = function ( id, callback){
    winston.info('Deleting todo item %s', id);
    ///xxx validate input
    //model.update({ _id: id }, { deleted_on: new Date},function (err, numberAffected, raw){
    model.remove({ _id: id },function ( err){
        if(err){
            winston.error('Failed to update todo item %s : %s', id, err);
            callback( err);
        }
    });
}



module.exports = todo_dm;

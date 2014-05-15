var mongoose=   require('mongoose');

var name= 'todo';
var schema= new mongoose.Schema(
    { what: 'string', 
      done: 'boolean' 
    }
);
module.exports = mongoose.model( name, schema);

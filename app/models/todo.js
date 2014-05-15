var mongoose=   require('mongoose');
var name= 'todo';
var schema= new mongoose.Schema(
    { _id:  { type:  mongoose.Schema.ObjectId},
      what: { type: String}, 
      done: { type: Boolean}
    },
    { collection: name }
);
module.exports = mongoose.model( name, schema);

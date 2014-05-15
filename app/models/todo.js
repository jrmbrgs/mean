var mongoose=   require('mongoose');
var name= 'todo';
var schema= new mongoose.Schema(
    { //_id:  { type:  mongoose.Schema.ObjectId},
      what:       { type: String,  required: true}, 
      is_done:    { type: Boolean, default: false},
      created_on: { type: Date, default: Date.now },
      updated_on: { type: Date },
    },
    { collection: name }
);
module.exports = mongoose.model( name, schema);

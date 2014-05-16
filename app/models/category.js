var mongoose=   require('mongoose');
var name= 'category';
var schema= new mongoose.Schema(
    { //_id:  { type:  mongoose.Schema.ObjectId},
      code:       { type: String,  required: true}, 
      name:       { type: String,  required: true}, 
      created_on: { type: Date, default: Date.now },
      updated_on: { type: Date },
    },
    { collection: name }
);
module.exports = mongoose.model( name, schema);

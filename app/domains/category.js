/* 
 *
 */

var winston=    require('winston');
require('../dbals/mongoose');
var model = require('../models/category');

var category_dm = function(){
}

category_dm.prototype.get = function ( callback){
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



module.exports = category_dm;

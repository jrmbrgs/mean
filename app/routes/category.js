/// Models
var winston=    require( 'winston');
require( '../dbals/mongoose');
var category_dm= require( '../domains/category');

module.exports= function( app){
    var category= new category_dm();
    
    /// Routes
    app.get( '/api/categories', get_all_categories);

    /// Render callbaks
    function handle_err( err, res){
        if( err){
            winston.error('routes/category/err : %s ' + err);
            res.send(500, err);
        }
    }
    function render_category( res, err, category_xs){
        if(err) handle_err(err, res);
        if( ! category_xs.length) res.send(404);
        else res.json(category_xs);
    }

    /// Routes callbacks
    function get_all_categories( req, res){
        category.get( render_category.bind(this, res));
    }
}

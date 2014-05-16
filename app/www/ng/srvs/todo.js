angular.module('todo_srv', [])
	.factory('todo_fact', function($http){
		return {
			get : function( hide_done){
                if( hide_done) return $http.get('/api/todos/not_done');
				return $http.get('/api/todos');
			},
			get_by_category : function( category_code, hide_done){
                if( hide_done) return $http.get('/api/todos/category/' + category_code +'/not_done');
				return $http.get('/api/todos/category/' + category_code);
			},
			create : function(todo_x){
				var post_x = $http.post('/api/todos', todo_x);
				return $http.get('/api/todos');
			},
			update : function(id, is_done){
				return $http.put('/api/todos/'+id, { 'is_done' : is_done});
			},
			delete : function(id){
				$http.delete('/api/todos/' + id);
				return $http.get('/api/todos');
			}
		}
	});

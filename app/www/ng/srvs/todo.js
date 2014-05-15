angular.module('todo_srv', [])
	.factory('todo_fact', function($http) {
		return {
			get : function() {
				return $http.get('/api/todo');
			},
			create : function(todo_x) {
				return $http.post('/api/todo', todo_x);
			},
			delete : function(id) {
				return $http.delete('/api/todo/' + id);
			}
		}
	});

angular.module('category_srv', [])
	.factory('category_fact', function($http){
		return {
			get : function(){
				return $http.get('/api/categories');
			},
		}
	});

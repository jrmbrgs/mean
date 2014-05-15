
angular.module('todo_ctrl', [])
	.controller('main_ctrl', function($scope, $http, todo_fact) {
        $scope.formData = {};

        todo_fact.get()
			.success(function(data) {
				$scope.todos = data;
			});

            
        $scope.createTodo = function() {
			if( ! $.isEmptyObject( $scope.formData)){
				todo_fact.create( $scope.formData)
					.success( function( data) {
						$scope.formData = {};
						$scope.todos = data;
					});
			}
		};

        $scope.deleteTodo = function(id){
            todo_fact.delete(id)
				.success(function(data) {
					$scope.todos = data;
				});
        };
    });

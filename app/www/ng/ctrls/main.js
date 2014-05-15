
angular.module('todo_ctrl', [])
    .controller('main_ctrl', function($scope, $http, $log, todo_fact) {
        $scope.formData = {};

        todo_fact.get( false)
            .success(function(data) {
                $scope.todos = data;
            });

        $scope.get = function( hide_done){
            todo_fact.get( hide_done)
                .success(function(data) {
                    $scope.todos = data;
                });
        };
        
        $scope.createTodo = function() {
            $log.log('Create todo ' + $scope.formData.what);
            if( ! $.isEmptyObject( $scope.formData)){
                todo_fact.create( $scope.formData)
                    .success( function( data) {
                        $scope.formData = {};
                        $scope.todos = data;
                    });
            }
        };

        $scope.updateTodo = function(id, is_done) {
            $log.log('Update todo ' + id + ' is done : ' + is_done);
            todo_fact.update( id, is_done)
                .success( function( data) {
                    //$scope.todos = data;
                });
        };

        $scope.deleteTodo = function(id){
            todo_fact.delete(id)
                .success(function(data) {
                    $scope.todos = data;
                });
        };
    });

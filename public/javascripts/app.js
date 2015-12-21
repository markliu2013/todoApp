angular.module('todoApp', ['ngRoute', 'ngResource'])
    /*.factory('Todos', ['$http', function($http) {
        return $http.get('/todos');
    }])
    .controller('TodoController', ['$scope', 'Todos', function ($scope, Todos) {
        Todos.success(function(data){
            $scope.todos = data;
        }).error(function(data, status){
            console.log(data, status);
            $scope.todos = [];
        });
    }])*/
    .factory('Todos', ['$resource', function($resource) {
        return $resource('/todos/:id', {}, {
            'query': {method:'GET', isArray:true},// get list all records
            'save': {method: 'POST'},//create record
            'update': {method:'PUT'},
            'delete': {method:'DELETE'}
        });
    }])
    .controller('TodoController', ['$scope', 'Todos', function($scope, Todos) {
        $scope.todos = Todos.query();
        $scope.addTodo = function() {
            if ( !$scope.name || $scope.name.length < 1 ) return;
            var todo = new Todos({ name: $scope.name, completed: false });
            todo.$save(function() {
                $scope.todos.push(todo);
                $scope.name = '';
            });
        }
        $scope.update = function(index) {
            var todo = $scope.todos[index];
            Todos.update({id: todo._id}, todo);
        }
        $scope.remaining = function() {
            var count = 0;
            angular.forEach($scope.todos, function(todo) {
                count += todo.completed ? 0 : 1;
            });
            return count;
        }
        $scope.clearCompleted = function() {
            $scope.todos = $scope.todos.filter(function(todo) {
                if (todo.completed) {
                    Todos.delete({id: todo._id});
                } else {
                    return true;
                }
            });
        }
    }])
    /*.config(['$routeProvider', function($routeProvider) {

    }])*/
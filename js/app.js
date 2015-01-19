var myApp = angular.module('myApp',[]);

myApp.controller('MainController', ['$scope', function($scope) {
    $scope.greeting = 'Hola!';
    $scope.current = 'Jeszcze nic.';
}]);
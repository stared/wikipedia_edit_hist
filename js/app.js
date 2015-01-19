var myApp = angular.module('myApp',[]);

myApp.controller('MainController',
    ['$scope','wikiApi', function($scope,wikiApi) {

        $scope.current = null;

    $scope.$watch('current',function(newQuery,oldQuery){
        if(newQuery)
            wikiApi.getRevs(newQuery,function(data){
                console.log(data);
                $scope.apiResponse = data;
            });
    });




}]);
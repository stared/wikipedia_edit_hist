var myApp = angular.module('myApp',[]);

myApp.controller('MainController',
    ['$scope','wikiApi', function($scope,wikiApi) {

        $scope.current = null;

        $scope.queries = [];

        var color = d3.scale.category10();

    $scope.$watch('current',function(newQuery,oldQuery){
        if(newQuery)
            $scope.$watch('current',function(newQuery,oldQuery){
                if(newQuery)
                    wikiApi.getRevs(newQuery,null,null,function(data){

                        var revs = data.reverse();
                        $scope.queries.push({
                            query:newQuery,
                            data:revs.map(function(rev){
                                return {
                                    size:rev.size,
                                    date:new Date(rev.timestamp)
                                }
                            }),
                            color:color($scope.queries.length)
                        });


                    });
            });
    });




}]).filter('datetonum', function() {
        return function(input, uppercase) {
            return Number(new Date(input));
        };
    });
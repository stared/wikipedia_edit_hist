var myApp = angular.module('myApp',[]);

myApp.controller('MainController',
    ['$scope','wikiApi', function($scope,wikiApi) {

        $scope.current = null;

        $scope.queries = [];
        $scope.days = 80;

        var color = d3.scale.category10();

    $scope.$watch('current',function(newQuery,oldQuery){
        console.log($scope.days,new Date(new Date()-1000*3600*24*$scope.days),1000*3600*24*$scope.days);
                if(newQuery)
                    wikiApi.getRevs(newQuery,new Date(new Date()-1000*3600*24*$scope.days),null,function(data){

                        console.log(data);
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




}]).filter('datetonum', function() {
        return function(input, uppercase) {
            return Number(new Date(input));
        };
    });
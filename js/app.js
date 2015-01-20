var myApp = angular.module('myApp',[]);

myApp.controller('MainController',
    ['$scope','wikiApi', function($scope,wikiApi) {

        $scope.current = null;

    $scope.$watch('current',function(newQuery,oldQuery){
        if(newQuery)
            wikiApi.getRevs(newQuery,function(data){
                console.log(data);
                for(var page in data.query.pages){

                    var revs = data.query.pages[page].revisions.reverse();

                    $scope.revisions = revs.map(function(rev){
                        return {
                            size:rev.size,
                            date:new Date(rev.timestamp)
                        }
                    });
                    break;
                }

            });
    });




}]).filter('datetonum', function() {
        return function(input, uppercase) {
            return Number(new Date(input));
        };
    });
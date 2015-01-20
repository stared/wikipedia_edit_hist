var myApp = angular.module('myApp',[]);

myApp.controller('MainController',
    ['$scope','wikiApi', function($scope,wikiApi) {

        $scope.current = null;

    $scope.$watch('current',function(newQuery,oldQuery){
        if(newQuery)
            wikiApi.getRevs(newQuery, null, null, function(data){
                console.log(data);
                for(var page in data.query.pages){

                    var revs = data.query.pages[page].revisions;

                    var min = Number(new Date(revs[0].timestamp));
                    var max = Number(new Date(revs[revs.length-1].timestamp));

                    $scope.revisions = revs.map(function(rev){
                        var num = Number(new Date(rev.timestamp)- min)/(max-min);

                        return {
                            size:rev.size,
                            float:num
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
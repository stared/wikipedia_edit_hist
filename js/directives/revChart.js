myApp.directive('revChart', function() {
    return {
        templateUrl: 'tpl/revChart.html',
        restrict: 'E',
        link:function($scope,element){

          $scope.$watch('revisions',function(newRevs){
              console.log(newRevs);
          });
        }
    };
});
myApp.directive('topbar', function() {
    return {
        templateUrl: 'tpl/topbar.html',
        restrict: 'E',
        scope: {
            query: '=query'
        },
        link:function($scope,element){

           $scope.clickHandler = function(){
               $scope.query = element.find('input').val();
               element.find('input').val('');
           }

        }
    };
});
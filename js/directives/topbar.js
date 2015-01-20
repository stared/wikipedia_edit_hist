myApp.directive('topbar', function() {
    return {
        templateUrl: 'tpl/topbar.html',
        restrict: 'E',
        scope: {
            query: '=query'
        },
        link:function($scope,element){

           $scope.clickHandler = function(){
               $scope.query = angular.element( document.querySelector( 'input#query' ) ).val();
               element.find('input').val('');
           }

        }
    };
});
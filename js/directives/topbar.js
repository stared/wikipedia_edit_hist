myApp.directive('topbar', function() {
    return {
        templateUrl: 'tpl/topbar.html',
        restrict: 'E',
        scope: {
            query: '=query'
        }
    };
});
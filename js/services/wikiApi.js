myApp.factory('wikiApi', ['$http',function ($http) {


    var wikiApiInstance = {
        getRevs: function (query,cb) {
            $http.jsonp("http://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp%7Csize&rvlimit=100&rvdir=older&titles="+query+"&callback=JSON_CALLBACK")
                .success(cb).error(function(data,status){
                console.log(data,status);
            });
        }
    };

    //

    return wikiApiInstance;
}]);
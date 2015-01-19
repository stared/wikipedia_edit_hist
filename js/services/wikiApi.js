myApp.factory('wikiApi', ['$http', function ($http) {

    // http://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp%7Csize&rvlimit=100&rvdir=older&titles="+query+"&callback=JSON_CALLBACK"

    var wikiAPIPath = "http://en.wikipedia.org/w/api.php";
    var wikiQueryDefaultParameters = {
        action:  "query",
        prop:    "revisions",
        format:  "json",
        rvprop:  "timestamp|size",
        rvlimit: 100,
        rvdir:   "older",
        titles:  "Mycorrhiza",  // Mycorrhiza by default :)
        callback: "JSON_CALLBACK"
    };

    var wikiApiInstance = {

        getRevs: function (query, cb) {

            var wikiQueryParameters = JSON.parse(JSON.stringify(wikiQueryDefaultParameters));  // poor man's copy
            wikiQueryParameters.titles = query;

            $http.jsonp(wikiAPIPath, {params: wikiQueryParameters})
                .success(cb)
                .error(function(data, status){
                    console.log("Error!", status);
                });
        }
    };

    //

    return wikiApiInstance;
}]);
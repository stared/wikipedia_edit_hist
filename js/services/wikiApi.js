myApp.factory('wikiApi', ['$http', function ($http) {

    // http://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp%7Csize&rvlimit=100&rvdir=older&titles="+query+"&callback=JSON_CALLBACK"
    // And a short test:
    // http://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp%7Csize&rvlimit=10&rvdir=older&titles=Matrix_product_state&callback=JSON_CALLBACK

    var wikiAPIPath = "http://en.wikipedia.org/w/api.php";
    var wikiQueryDefaultParameters = {
        action:  "query",
        prop:    "revisions",
        format:  "json",
        rvprop:  "timestamp|size|user",
        rvlimit: 500,
        rvdir:   "older",
        titles:  "Mycorrhiza",  // Mycorrhiza by default :)
        callback: "JSON_CALLBACK"
    };

    // rvstart
    // rvend
    // rvcontinue

    var getRevsPart = function (params, callback, results) {

        console.log("getRevsPart with parameters", params);

        $http.jsonp(wikiAPIPath, {params: params})
            .success(function (data, status) {

                // we expect it to have only a single key, unless '|' in 'titles'
                for (var k in data['query']['pages']) {
                    results.push(data['query']['pages'][k]['revisions']);
                }

                if (!!data['query-continue']) {
                    params.rvcontinue = data['query-continue']['revisions']['rvcontinue'];
                    // console.log(params.titles + " in progress... " + params.rvcontinue);
                    getRevsPart(params, callback, results);
                } else {
                    console.log("Done!", [].concat.apply([], results));
                    callback([].concat.apply([], results));
                }

            })
            .error(function (data, status) {
                console.log("Error!", status);
            });

    };

    var wikiApiInstance = {

        getRevs: function (query, callback) {

            var wikiQueryParameters = angular.copy(wikiQueryDefaultParameters);
            wikiQueryParameters.titles = query;

            getRevsPart(wikiQueryParameters, callback, []);
        }
    };

    //

    return wikiApiInstance;
}]);
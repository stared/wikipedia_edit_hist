myApp.factory('wikiApi', ['$http', function ($http) {

    // API HELP:
    // https://www.mediawiki.org/wiki/API:Properties
    // https://wiki.openstack.org/w/api.php?action=help&modules=query%2Brevisions

    // And a short test:
    // http://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp%7Csize&rvlimit=10&rvdir=older&titles=Matrix_product_state&callback=JSON_CALLBACK

    var wikiAPIPath = "http://en.wikipedia.org/w/api.php";
    var wikiQueryDefaultParameters = {
        action:  "query",
        prop:    "revisions",
        format:  "json",
        rvprop:  "timestamp|size|user|userid|tags",
        rvlimit: 500,
        rvdir:   "older",
        titles:  "Mycorrhiza",  // Mycorrhiza by default :)
        callback: "JSON_CALLBACK"
    };

    var getRevsPart = function (params, callback, results, callsLeft) {

        $http.jsonp(wikiAPIPath, {params: params})
            .success(function (data, status) {

                // we expect it to have only a single key, unless '|' in 'titles'
                for (var k in data['query']['pages']) {
                    results.push(data['query']['pages'][k]['revisions']);
                }

                if (!!data['query-continue'] && callsLeft) {
                    params.rvcontinue = data['query-continue']['revisions']['rvcontinue'];
                    console.log(params.titles + " in progress... " + params.rvcontinue);
                    getRevsPart(params, callback, results, callsLeft - 1);
                } else {
                    console.log(params.titles + " DONE!");
                    callback([].concat.apply([], results));
                }

            })
            .error(function (data, status) {
                console.log("Error!", status);
            });

    };

    var wikiApiInstance = {

        getRevs: function (query, dateFrom, dateTo, callback) {

            var wikiQueryParameters = angular.copy(wikiQueryDefaultParameters);

            var maxCalls = 10;

            wikiQueryParameters.titles = query;

            // we assume rvdir=older (default)
            // otherwise rvstart<->rvend
            if (!!dateFrom && dateFrom.getFullYear) {
                wikiQueryParameters.rvend = [dateFrom.getFullYear(), dateFrom.getMonth() + 1, dateFrom.getDate(), "000000"].join("");
            }
            if (!!dateTo && dateFrom.getFullYear) {
                wikiQueryParameters.rvstart = [dateTo.getFullYear(), dateTo.getMonth() + 1, dateTo.getDate(), "000000"].join("");
            }

            console.log("Starting: " + wikiQueryParameters.titles + "...");
            getRevsPart(wikiQueryParameters, callback, [], maxCalls);
        }
    };

    return wikiApiInstance;
}]);
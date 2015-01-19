myApp.factory('wikiApi', function () {
    var wikiApiInstance = {
        sayYo: function () {
            alert('yo!');
        }
    };


    return wikiApiInstance;
});
myApp.service('deezerService', function($http, $q) {
    
    this.findTracks= function (queryString) {
        var deferred = $q.defer();
        $http.get("https://api.deezer.com/search/track?q="+queryString)
        .success(function (data) {
            deferred.resolve(data);
        })
        .error(function (error) {
            deferred.reject(error);
        });

    return deferred.promise;
    }
});
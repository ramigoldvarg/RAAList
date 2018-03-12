var myApp = angular.module('myApp', [])

myApp.controller('myController', function ($scope, $http, $q) {
    $http.get("/api/songs").success(function (data) {

        var socket = io();

        $scope.songLiked = function (index) {
            socket.emit('like', index);
        }

        $http.get("/api/songs").success(function (data) {
            $scope.songsList = data;
        }).error(function (data) {
            alert("error");
        });
    });
});

myApp.factory('socket', ['$rootScope', function ($rootScope) {
    var socket = io.connect();

    return {
        on: function (eventName, callback) {
            socket.on(eventName, callback);
        },
        emit: function (eventName, data) {
            socket.emit(eventName, data);
        }
    };
}]);

myApp.controller('MySongController', function ($scope) {

});

myApp.controller('searchController', function($scope, deezerService) {
    $scope.queryString="";
    $scope.searchTracks = function(){
        deezerService.findTracks($scope.queryString).then(function(data){
            $scope.results = data.data;
            $scope.list = $scope.results.slice(0,6);
            $scope.tracks = $scope.handleTracks($scope.list);
        });
        
    }

    $scope.handleTracks = function(arrayFromApi){
        var tracksForView = [];
        arrayFromApi.forEach(function(item){
            tracksForView.push({
                "track_id": item.id,
                "song": item.title,
                "artist": item.artist.name,
                "cover":item.album.cover
            });
        });
        return tracksForView;
    }
});

myApp.directive('mySongCard', function() {
    return {
        restrict: 'E',
        scope: {
            songInfo: '=',
            index: '='
        },
        templateUrl: '/assets/song-card.html'
    };
});

myApp.directive('mySearchResult', function() {
    return {
        restrict: 'E',
        scope: {
            resultInfo: '='
        },
        templateUrl: '/assets/search-result.html'
    };
});


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

myApp.directive('mySongCard', function () {
    return {
        restrict: 'E',
        scope: {
            songInfo: '=',
            index: '='
        },
        templateUrl: '/assets/song-card.html'
    };
});
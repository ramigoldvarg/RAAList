var myApp = angular.module('myApp', [])

myApp.controller('myController', function($scope) {
  $scope.songsList = [
      {
          "songName": "Lil John the king",
          "likesNumber": 100
      },
      {
          "songName": "Tyrone the king",
          "likesNumber": 90
      },
      {
          "songName": "Antonyo The King",
          "likesNumber": 80
      },
  ]
});

myApp.factory('socket', ['$rootScope', function($rootScope) {
  var socket = io.connect();

  return {
    on: function(eventName, callback){
      socket.on(eventName, callback);
    },
    emit: function(eventName, data) {
      socket.emit(eventName, data);
    }
  };
}]);

myApp.controller('MySongController', function($scope, socket) {
    $scope.songLiked = function(index) {
        socket.emit('like', index);
    }
});

myApp.directive('mySongCard', function() {
    return {
        restrict: 'E',
        scope: {
            songInfo: '=',
            index: '='
        },
        templateUrl: 'song-card.html'
    };
});
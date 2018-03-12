var myApp = angular.module('myApp', [])

myApp.controller('myController', function($scope,$http) {
  $scope.songsList = $http("/api/songs").success(function(data){
      return data;
  })
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
        console.log(index)
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
        link: function ($scope, element, attrs) {
            $scope.songLiked = function(songIndex) {
                if(songIndex!=0){
                    alert(songIndex);
                }
            }
        },

        // link: function ($scope, element, attrs) {
            
        // },

        templateUrl: 'song-card.html'
    };
});
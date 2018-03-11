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
        templateUrl: 'song-card.html'
    };
});
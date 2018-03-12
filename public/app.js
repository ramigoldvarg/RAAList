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
        console.log(index)
        socket.emit('like', index);
    }
});

myApp.controller('searchController', function($scope, deezerService) {
    $scope.queryString="";
    $scope.searchTracks = function(){
        deezerService.findTracks($scope.queryString).then(function(data){
            $scope.results = data.data;
            $scope.list = $scope.results.slice(0,6);
            return ($scope.handleTracks($scope.list));
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


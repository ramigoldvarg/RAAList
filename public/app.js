var myApp = angular.module('myApp', [])

myApp.controller('myController', function($scope,$http,$q) {

    var socket = io();

    $scope.songLiked = function(index) {
        socket.emit('like', index);
    }

    $scope.isSignedIn = true;

    initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var uid = user.uid;
                var phoneNumber = user.phoneNumber;
                var providerData = user.providerData;
                user.getIdToken().then(function(accessToken) {
                    const user = JSON.stringify({
                        displayName: displayName,
                        email: email,
                        emailVerified: emailVerified,
                        phoneNumber: phoneNumber,
                        photoURL: photoURL,
                        uid: uid,
                        accessToken: accessToken,
                        providerData: providerData
                    }, null, '  ');
                });
            } else {
                // FirebaseUI config.
                var uiConfig = {
                    signInSuccessUrl: 'localhost:3000/home',
                    signInOptions: [
                        // Leave the lines as is for the providers you want to offer your users.
                        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                        firebase.auth.GithubAuthProvider.PROVIDER_ID,
                    ]
                    // Terms of service url.
                    //tosUrl: '<your-tos-url>'
                };

                // Initialize the FirebaseUI Widget using Firebase.
                var ui = new firebaseui.auth.AuthUI(firebase.auth());

                // The start method will wait until the DOM is loaded.
                ui.start('#firebaseui-auth-container', uiConfig);

                $scope.isSignedIn = false;
            }
        }, function(error) {
                console.log(error);
            });
        };
            

    initApp();

     $http.get("/api/songs").success(function(data){
        $scope.songsList =  data;
    }).error(function(data){
        alert("error");
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

myApp.controller('MySongController', function($scope) {
    
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


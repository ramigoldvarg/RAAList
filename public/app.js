var myApp = angular.module('myApp', [])

myApp.controller('myController', function($scope) {
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
        templateUrl: '/assets/song-card.html'
    };
});
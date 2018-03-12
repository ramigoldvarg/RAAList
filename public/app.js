var myApp = angular.module('myApp', [])

myApp.controller('myController', function($scope) {
  
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
            document.getElementById('sign-in-status').textContent = 'Signed in';
            document.getElementById('sign-in').textContent = 'Sign out';
            document.getElementById('account-details').textContent = JSON.stringify({
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
            // User is signed out.
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
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
        templateUrl: 'song-card.html'
    };
});
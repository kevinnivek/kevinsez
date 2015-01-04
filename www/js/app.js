// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// for media plugin : http://plugins.cordova.io/#/package/org.apache.cordova.media
.factory('MediaSrv', function($q, $ionicPlatform, $window) {
  var service = {
    loadMedia: loadMedia,
    getStatusMessage: getStatusMessage,
    getErrorMessage: getErrorMessage
  };

  function loadMedia(src, onError, onStatus, onStop) {
    var defer = $q.defer();
    $ionicPlatform.ready(function() {
      var mediaSuccess = function() {
        if (onStop) {
          onStop();
        }
      };
      var mediaError = function(err) {
        _logError(src, err);
        if (onError) {
          onError(err);
        }
      };
      var mediaStatus = function(status) {
        if (onStatus) {
          onStatus(status);
        }
      };

      if ($ionicPlatform.is('android')) {
        src = '/android_asset/www/' + src;
      }
      defer.resolve(new $window.Media(src, mediaSuccess, mediaError, mediaStatus));
    });
    return defer.promise;
  }

  function _logError(src, err) {
    console.error('media error', {
      code: err.code,
      message: getErrorMessage(err.code)
    });
  }

  function getStatusMessage(status) {
    if (status === 0) {
      return 'Media.MEDIA_NONE';
    } else if (status === 1) {
      return 'Media.MEDIA_STARTING';
    } else if (status === 2) {
      return 'Media.MEDIA_RUNNING';
    } else if (status === 3) {
      return 'Media.MEDIA_PAUSED';
    } else if (status === 4) {
      return 'Media.MEDIA_STOPPED';
    } else {
      return 'Unknown status <' + status + '>';
    }
  }

  function getErrorMessage(code) {
    if (code === 1) {
      return 'MediaError.MEDIA_ERR_ABORTED';
    } else if (code === 2) {
      return 'MediaError.MEDIA_ERR_NETWORK';
    } else if (code === 3) {
      return 'MediaError.MEDIA_ERR_DECODE';
    } else if (code === 4) {
      return 'MediaError.MEDIA_ERR_NONE_SUPPORTED';
    } else {
      return 'Unknown code <' + code + '>';
    }
  }
  
  return service;
})


.controller('AudioCtrl', function($scope, MediaSrv) {
  $scope.playAudio = function(filename) {
    //  alert("test");
    MediaSrv.loadMedia('sounds/' + filename).then(function(media) {
      media.play();
       });
  }
   $scope.playRandAudio = function(filename) {
        var chooser = randomNoRepeats(['areas-of-my-body.mp3', 'body-examined.mp3', 'bradley-pussywillow.mp3', 'dont-enter-bedroom.mp3', 'father-foot-inspector.mp3', 'feet-slime.mp3', 'inspect-your-feet.mp3', 'lieing-down-sleeping.mp3', 'secret-room-cellar.mp3', 'stool-examined.mp3', 'toe-jobs.mp3', 'touch-left-hand-only.mp3', 'various-slimes.mp3']);
        MediaSrv.loadMedia('sounds/' + chooser()).then(function(media) {
           media.play();
             });
            }
  function randomNoRepeats(array) {
            var copy = array.slice(0);
            return function() {
            if (copy.length < 1) { copy = array.slice(0); }
            var index = Math.floor(Math.random() * copy.length);
            var item = copy[index];
            copy.splice(index, 1);
            return item;
        };
    }

    
})

.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {
            
            // Triggered on a button click, or some other target
            $scope.showPopup = function() {
            $scope.data = {}
            
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                                           template: '<input type="password" ng-model="data.wifi">',
                                           title: 'Enter Wi-Fi Password',
                                           subTitle: 'Please use normal things',
                                           scope: $scope,
                                           buttons: [
                                                     { text: 'Cancel' },
                                                     {
                                                     text: '<b>Save</b>',
                                                     type: 'button-positive',
                                                     onTap: function(e) {
                                                     if (!$scope.data.wifi) {
                                                     //don't allow the user to close unless he enters wifi password
                                                     e.preventDefault();
                                                     } else {
                                                     return $scope.data.wifi;
                                                     }
                                                     }
                                                     },
                                                     ]
                                           });
            myPopup.then(function(res) {
                         console.log('Tapped!', res);
                         });
            $timeout(function() {
                     myPopup.close(); //close the popup after 3 seconds for some reason
                     }, 3000);
            };
            // A confirm dialog
            $scope.showConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
                                                   title: 'Consume Ice Cream',
                                                   template: 'Are you sure you want to eat this ice cream?'
                                                   });
            confirmPopup.then(function(res) {
                              if(res) {
                              console.log('You are sure');
                              } else {
                              console.log('You are not sure');
                              }
                              });
            };
            
            // An alert dialog
            $scope.showAlert = function() {
            window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/sounds", gotFile, fail);

            var alertPopup = $ionicPopup.alert({
                                               title: 'Don\'t eat that!',
                                               template: 'It might taste good'
                                               });
            alertPopup.then(function(res) {
                            console.log('Thank you for not eating my delicious ice cream cone');
 
                            });
            };
            });



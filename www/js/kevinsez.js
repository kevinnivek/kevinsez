angular.module('kevnav', ['ionic'])



// for media plugin : http://plugins.cordova.io/#/package/org.apache.cordova.media
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


.config(function($stateProvider, $urlRouterProvider) {
        
        openFB.init({appId: '1404237916535441'});

        
       
        $stateProvider
        .state('tabs', {
               url: "/tab",
               abstract: true,
               templateUrl: "templates/tabs.html"
               })
        .state('tabs.home', {
               url: "/home",
               views: {
               'home-tab': {
               templateUrl: "templates/home.html",
               controller: 'HomeTabCtrl'
               }
               }
               })
        // actual categories START
        .state('tabs.bodyslimes', {
               url: "/bodyslimes",
               views: {
               'home-tab': {
               templateUrl: "templates/bodyslimes.html"
               }
               }
               })
        .state('tabs.jammingfingers', {
               url: "/jammingfingers",
               views: {
               'home-tab': {
               templateUrl: "templates/jammingfingers.html"
               }
               }
               })
        
        .state('tabs.feet', {
               url: "/feet",
               views: {
               'home-tab': {
               templateUrl: "templates/feet.html"
               }
               }
               })
        .state('tabs.cleaningareas', {
               url: "/cleaningareas",
               views: {
               'home-tab': {
               templateUrl: "templates/cleaningareas.html"
               }
               }
               })
        
        .state('tabs.ticklecloset', {
               url: "/ticklecloset",
               views: {
               'home-tab': {
               templateUrl: "templates/ticklecloset.html"
               }
               }
               })
        .state('tabs.sleeping', {
               url: "/sleeping",
               views: {
               'home-tab': {
               templateUrl: "templates/sleeping.html"
               }
               }
               })
        
        .state('tabs.hotbreathing', {
               url: "/hotbreathing",
               views: {
               'home-tab': {
               templateUrl: "templates/hotbreathing.html"
               }
               }
               })
        .state('tabs.watchingafar', {
               url: "/watchingafar",
               views: {
               'home-tab': {
               templateUrl: "templates/watchingafar.html"
               }
               }
               })
        
        .state('tabs.huffing', {
               url: "/huffing",
               views: {
               'home-tab': {
               templateUrl: "templates/huffing.html"
               }
               }
               })
        .state('tabs.warmsmiles', {
               url: "/warmsmiles",
               views: {
               'home-tab': {
               templateUrl: "templates/warmsmiles.html"
               }
               }
               })
        
        // actual categories END
        .state('tabs.about', {
               url: "/about",
               views: {
               'about-tab': {
               templateUrl: "templates/about.html"
               }
               }
               })
        .state('tabs.navstack', {
               url: "/navstack",
               views: {
               'about-tab': {
               templateUrl: "templates/nav-stack.html"
               }
               }
               })
        .state('tabs.contact', {
               url: "/contact",
               views: {
               'contact-tab': {
               templateUrl: "templates/contact.html"
               }
               }
               });
        
        
        $urlRouterProvider.otherwise("/tab/home");
        
        })

.controller('HomeTabCtrl', function($scope) {
            console.log('HomeTabCtrl');
            
            })





.controller('MainCtrl', function($scope, MediaSrv) {
            
            // declare playing variable outside of the play function
            var playing = false;
            var r_playing = false;
            

            
            $scope.playAudio = function(filename) {
            
            // Audio player
            //
            var my_media = null;
            var mediaTimer = null;
            
            
            function onSuccess() {
            console.log("playAudio():Audio Success");
            console.log("test123");
            playing = false;
            }
            
            function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
            playing = false;
            }

            
            
            // Create Media object from src
           my_media = new Media('sounds/' + filename, onSuccess, onError);
            
            // Play audio
            if (!playing) {
                my_media.play();
                console.log('playing');
                playing = true;
            } else {
                my_media.stop();
                playing = false;
            }
            
            
            
            
            }
            $scope.share = function() {
            console.log('here i am!');
            };

            
            $scope.playRandAudio = function(filename) {
            
            var r_media = null;
            var r_mediaTimer = null;
            
            var chooser = randomNoRepeats(['areas-of-my-body.mp3', 'body-examined.mp3', 'bradley-pussywillow.mp3', 'dont-enter-bedroom.mp3', 'father-foot-inspector.mp3', 'feet-slime.mp3', 'inspect-your-feet.mp3', 'lieing-down-sleeping.mp3', 'secret-room-cellar.mp3', 'stool-examined.mp3', 'toe-jobs.mp3', 'touch-left-hand-only.mp3', 'various-slimes.mp3']);
            
            r_media = new Media('sounds/' + chooser(), r_onSuccess, r_onError);
            
            function r_onSuccess() {
            alert('audio success');
                r_playing = false;
            }
            
            function r_onError(error) {
                alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
                r_playing = false;
            }
            
            // Play audio
            if (!r_playing) {
                r_media.play();
                //alert('playing');
                r_playing = true;
            } else {
                r__media.stop();
                r_playing = false;
            }
            
            
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
            });
/******** MAIN ANGULAR VAR *******/
var myapp = angular.module('myapp', [
  'ngRoute',
  'ngAnimate'
]);

/******* UI-ROUTING *******/

myapp.config(function($routeProvider){  

$routeProvider
  .when('/state1', {
    templateUrl: "partials/state1.html"
  })
  .when('/state1.list', {
    templateUrl: "partials/state1.list.html",
    controller: 'state1controller'
  })
  .when('/videos', {
    templateUrl: "partials/video.html",
    controller: 'videocontroller'
  })
  .when('/gallery', {
    templateUrl: "partials/gallery.html",
    controller: 'slidercontroller'
  })
// For any unmatched url, send to /state1  
  // .otherwise({ redirectTo: '/videos'});
});
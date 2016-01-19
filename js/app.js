/******** MAIN ANGULAR VAR *******/
var myapp = angular.module('myapp', [
  'ui.router',
  'ngAnimate',
  'appController', 
  'slider.directive'
]);

/******* UI-ROUTING *******/

myapp.config(function($stateProvider, $urlRouterProvider){  
// For any unmatched url, send to /state1
$urlRouterProvider.otherwise("/state1");
    
$stateProvider
  .state('state1', {
    url: "/state1",
    templateUrl: "partials/state1.html"
  })
  .state('state1.list', {
    url: "/list",
    templateUrl: "partials/state1.list.html",
    controller: 'state1controller'
  })
  .state('videos', {
    url: "/videos",
    templateUrl: "partials/video.html",
    controller: 'videocontroller'
  })
  .state('gallery', {
    url: "/gallery",
    templateUrl: "partials/gallery.html",
    controller: 'slidercontroller'
  });
});
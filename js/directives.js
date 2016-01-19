angular.module('slider.directive', ['ngAnimate'])
  .directive('slider', function ($timeout) {
  return {
    restrict: 'AE',
    replace: true,
    scope:{
      pictures: '='
    },
    link: function (scope, elem, attrs) {
    scope.currentIndex=0;

    scope.next=function(){
      scope.currentIndex<scope.pictures.length-1?scope.currentIndex++:scope.currentIndex=0;
    };
    
    scope.prev=function(){
      scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.pictures.length-1;
    };
    
    scope.$watch('currentIndex',function(){
      scope.pictures.forEach(function(image){
        image.visible=false;
      });
      scope.pictures[scope.currentIndex].visible=true;
    });
    
    /* Start: For Automatic slideshow*/
    
    var timer;
    
    var sliderFunc=function(){
      timer=$timeout(function(){
        scope.next();
        timer=$timeout(sliderFunc,10000);
      },10000);
    };
    
    sliderFunc();
    
    scope.$on('$destroy',function(){
      $timeout.cancel(timer);
    });
    
    /* End : For Automatic slideshow*/
    
    },
    templateUrl:'partials/slider.html'
  }
});
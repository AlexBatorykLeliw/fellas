var appController = angular.module('appController',[]);

/******* STATE1 *******/
appController.controller('state1controller', ['$scope', function($scope){
	$scope.items = ["A", "List", "Of", "Items"];
}]);

/******* SLIDER *******/
appController.controller('slidercontroller', ['$scope', function($scope) {
    $scope.pictures=[
	    				{src:'img1.png',title:'Pic 1'},
	    				{src:'img2.jpg',title:'Pic 2'},
	    				{src:'img3.jpg',title:'Pic 3'},
	    				{src:'img4.png',title:'Pic 4'},
	    				{src:'img5.png',title:'Pic 5'}
	]; 
}]);


/******* VIDEO *******/
appController.controller('videocontroller', ['$scope', function($scope) {
    $scope.barSize=600;
    $scope.myMovie=document.getElementById('myMovie');
    $scope.playButton=document.getElementById('playButton');
    $scope.defaultbar=document.getElementById('defaultBar');
    $scope.progressBar=document.getElementById('progressBar');
	
	$scope.update = function(){
		if (!myMovie.ended) {
		    var size=parseInt($scope.myMovie.currentTime*$scope.barSize/$scope.myMovie.duration);
		    $scope.progressBar.style.width=size+'px';
	  	} else {
		    $scope.progressBar.style.width='0px';
		    $scope.playButton.innerHTML='Play';
		    window.clearInterval(updateBar);
	  	}
	}

    $scope.playOrPause = function(){
    	if (!$scope.myMovie.paused && !$scope.myMovie.ended){
		    $scope.myMovie.pause();
		    $scope.playButton.innerHTML='Play';
		    window.clearInterval(updateBar);
	    } else {
		    $scope.myMovie.play();
		    $scope.playButton.innerHTML='Pause';
		    var updateBar=setInterval($scope.update, 500);
	    }
    }

    $scope.clickedBar = function(e){
	  	if(!$scope.myMovie.paused && !$scope.myMovie.ended){
		    var mouseX=e.pageX-$scope.defaultbar.offsetLeft;
		    var newtime=mouseX*$scope.myMovie.duration/$scope.barSize;
		    $scope.myMovie.currentTime=newtime;
		    $scope.progressBar.style.width=mouseX+'px';
	  	}
	}
}]);
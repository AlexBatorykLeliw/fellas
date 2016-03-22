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
	
    /**
     * Array to hold source path and titles.
     */
	$scope.videos=[
				  		{src:'testVideo.mp4', title:'vid1'},
				  		{src:'For Nisha.mp4', title:'vid2'},
				  		{src:'testVideo2.mp4', title:'vid3'},
	];

    /**
     * Video player objects
     */
    $scope.initialisePlayer = function() {
        $scope.barSize=400;
        $scope.myMovie=document.getElementById('myMovie');
        $scope.playButton=document.getElementById('playButton');
        $scope.pauseButton=document.getElementById('pauseButton');
        $scope.muteButton=document.getElementById('muteButton');
        $scope.lowVolumeButton=document.getElementById('lowVolumeButton');
        $scope.highVolumeButton=document.getElementById('highVolumeButton');
        $scope.nextButton=document.getElementById('nextButton');
    	$scope.seekSlider = document.getElementById('seekSlider');
    	$scope.currentTimeText = document.getElementById('currentTimeText');
    	$scope.durationTimeText = document.getElementById('durationTimeText');
    	$scope.volumeSlider=document.getElementById('volumeSlider');
    	$scope.fullScreen=document.getElementById('fullScreen');
    	$scope.currentVolume = document.getElementById('seekSlider');
        $scope.isMute = false;
    }
    window.onload = $scope.initialisePlayer();

    /**
     * Play or pause the video
     */
    $scope.playOrPause = function(){
        if($scope.myMovie.paused || $scope.myMovie.ended){
            $scope.myMovie.play();
            $scope.playButton.style.display='none';
            $scope.pauseButton.style.display='inline';
        } else {
            $scope.myMovie.pause();
            $scope.playButton.style.display='inline';
            $scope.pauseButton.style.display='none';
        }
    }

    //var updateBar=setInterval($scope.videoSeekTimeUpdate, 100);

	/**
     * Play button
     */
	$scope.playButton.addEventListener("click", function() {
	   $scope.playOrPause();
    });

    /**
     * Plause button
     */
    $scope.pauseButton.addEventListener("click", function() {
		$scope.playOrPause();
    });
    
    /**
     * Update video time displayed on video player bar.
     */
    $scope.videoSeekTimeUpdate = function(){
        var newTime = $scope.myMovie.currentTime * (100 / $scope.myMovie.duration);
        $scope.seekSlider.value = newTime;

        //Logic to work out current time/duration
        var curmins = Math.floor($scope.myMovie.currentTime / 60);
        var cursecs = Math.floor($scope.myMovie.currentTime - curmins/ 60);
        var durmins = Math.floor($scope.myMovie.duration / 60);
        var dursecs = Math.floor($scope.myMovie.duration - durmins / 60);
        if(cursecs < 10){ cursecs = "0"+cursecs;}
        if(dursecs < 10){ dursecs = "0"+dursecs;}
        if(curmins < 10){ curmins = "0"+curmins;}
        if(dursecs < 10){ durmins = "0"+durmins;}
        $scope.currentTimeText.innerHTML = curmins+":"+cursecs;
        $scope.durationTimeText.innerHTML = durmins+":"+dursecs;
    }

    /**
     * Change the time of the video when slider point is changed.
     */
    $scope.videoSeek = function(){
        var seekTo = $scope.myMovie.duration * ($scope.seekSlider.value / 100);
        $scope.myMovie.currentTime = seekTo;
    }

    /**
     * When the seek slider is changed, it calls function that changes the time of the
     * video, depending on the value of the seek slider.
     */
    $scope.seekSlider.addEventListener("change", function() {
        $scope.videoSeek();
    });

    /**
     * When the video is playing, this calls the function that updates the time of the video,
     * depending on the seek slider value.
     */
    $scope.myMovie.addEventListener("timeupdate", function() {
        $scope.videoSeekTimeUpdate();
    });

	/**
     * Changes sound icon depending on slider value.
     */
 	$scope.soundIcon = function(){
    	if($scope.volumeSlider.value == 0){
			$scope.muteButton.style.display='inline';
   			$scope.lowVolumeButton.style.display='none';
    		$scope.highVolumeButton.style.display='none';
    	} else if($scope.volumeSlider.value <= 50){
    		$scope.muteButton.style.display='none';
   			$scope.lowVolumeButton.style.display='inline';
    		$scope.highVolumeButton.style.display='none';
    	} else {
			$scope.muteButton.style.display='none';
   			$scope.lowVolumeButton.style.display='none';
    		$scope.highVolumeButton.style.display='inline';
    	}
    }

	/**
     * Stores slider value if not 0. This allows volume to be placed back
     * to same volume after unmute.
     */
	$scope.storeVolume = function(){
    	if($scope.volumeSlider.value > 0){
    		$scope.currentVolume = $scope.volumeSlider.value; 
            console.log($scope.currentVolume);
    	} else {
            $scope.isMute = true;
        }
    }

	/**
     * Changes video volume depending on slider value.
     */
    $scope.volumeSlider.addEventListener("mouseup", function() {
    	$scope.storeVolume();
    	$scope.myMovie.volume = $scope.volumeSlider.value / 100;
        if($scope.isMute){
            $scope.myMovie.muted = false;
        }
		$scope.soundIcon();
    });

    /**
     * Determines whether a high/low volume button or a mute button has been clicked.
     * Changes the volume and slider values depending on what was clicked.
     */
	$scope.soundButton = function(){
        $scope.storeVolume();
    	if($scope.volumeSlider.value > 0){
    		$scope.volumeSlider.value = 0;
    		$scope.myMovie.muted = true;
    		$scope.soundIcon();
    	} else {
    		$scope.volumeSlider.value = $scope.currentVolume;
    		$scope.myMovie.muted = false;
    		$scope.myMovie.volume = $scope.volumeSlider.value / 100;
    		$scope.soundIcon();
    	}
    }

    /**
     * Sound buttons
     */
    $scope.highVolumeButton.addEventListener("click", function() {
       	$scope.soundButton();
    }); 
    $scope.lowVolumeButton.addEventListener("click", function() {
      	$scope.soundButton();
    });
    $scope.muteButton.addEventListener("click", function() {
       	$scope.soundButton();
    });

	/**
     * When fullScreen button is pressed, it opens the video in full screen and
     * vice versa.
     * Works for Firefox, Chrome and Safari.
     */
	$scope.fullScreen.addEventListener("click", function() {
  		if ($scope.myMovie.requestFullscreen) {
    		$scope.myMovie.requestFullscreen();
  		} else if ($scope.myMovie.mozRequestFullScreen) {
    		$scope.myMovie.mozRequestFullScreen(); // Firefox
  		} else if ($scope.myMovie.webkitRequestFullscreen) {
    		$scope.myMovie.webkitRequestFullscreen(); // Chrome and Safari
  		}
	});

    

}]);
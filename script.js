(function(window, document) {

    const video = document.getElementById("video");
    const playPauseButton = document.getElementById("play-pause");
    const progressInput = document.getElementById("progress-input");
    const videoProgress = document.getElementById("video-progress");
    const muteButton = document.getElementById("mute");
    const videoControls = document.getElementById("controls");
    const videoContainer = document.getElementById("video-container");
    const fullScreenButton = document.getElementById("fullscreen");

    const fullScreenSupported = !!document.fullscreenEnabled;

    function playPauseClicked(){
        if(video.paused){
            video.play()
        }else{
            video.pause()
        }
    }

    function muteButtonClicked(){
        video.muted = !video.muted;
        if(video.muted){
            muteButton.innerHTML = `<i class="fa fa-volume-mute"></i>`;
        }else{
            muteButton.innerHTML = `<i class="fa fa-volume-up"></i>`;
        }
    }

    function updatePlayPauseIcon(){
            if(video.paused){
                playPauseButton.innerHTML = `<i class="fa fa-play"></i>`;
            }else{
                playPauseButton.innerHTML = `<i class="fa fa-pause"></i>`;
            }
    }

    function updateVideoProgress(){
        progressInput.value = (video.currentTime / video.duration) * 100;
        let minutes = Math.floor(video.currentTime / 60);
        if(minutes < 10) minutes = "0" + minutes;
        let seconds = Math.floor(video.currentTime % 60);
        if(seconds < 10) seconds = "0" + seconds;
        videoProgress.innerHTML = `${minutes}: ${seconds}`;
    }

    function seekVideo(){
        let seekToTime = (progressInput.value * video.duration) / 100;
        console.log("seekVideo: " + seekToTime);

        if( seekToTime < 0 || seekToTime > video.duration) return;

        video.pause();
        video.currentTime = seekToTime;

        var timer = setInterval(function(){
            if(video.paused && video.readyState == 4){
                video.play();
                clearInterval(timer);
            }
        },100);
    }

    function handleFullscreen(){
        if(!fullScreenSupported)return;

        if(!document.fullscreenElement){
            document.documentElement.requestFullscreen();
            fullScreenButton.innerHTML = `<i class="fa fa-compress"></i>`;
        }else{
            document.exitFullscreen();
            fullScreenButton.innerHTML = `<i class="fa fa-expand"></i>`;
        }
    }

    function init(){
        console.log("start")
        video.controls = false;
        playPauseButton.addEventListener("click", playPauseClicked);
        video.addEventListener("play", updatePlayPauseIcon);
        video.addEventListener("pause", updatePlayPauseIcon);
        muteButton.addEventListener("click", muteButtonClicked);
        video.addEventListener("timeupdate", updateVideoProgress);
        progressInput.addEventListener("change", seekVideo);


        if(fullScreenSupported){
            fullScreenButton.addEventListener("click",handleFullscreen)
        }else{
            fullScreenButton.style.display = "none";
        }
    }

        window.onload = init;

})(window, document);
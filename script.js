const container = document.querySelector(".container");
const mainVideo = container.querySelector("video");
const progressBar = container.querySelector(".progress-bar");
const playPauseButton = container.querySelector(".play-pause i");
const skipBackwardButton = container.querySelector(".skip-backward i");
const skipForwardButton = container.querySelector(".skip-forward i");
const volumeButton = container.querySelector(".volume i");
const volumeSlider = container.querySelector(".left input");
const speedButton = container.querySelector(".playback-speed span");
const speedOptions = container.querySelector(".speed-options");
const picInPicButton = container.querySelector(".pic-in-pic span");
const fullscreenButton = container.querySelector(".fullscreen i");

mainVideo.addEventListener("timeupdate", (e) => {
    let { currentTime, duration } = e.target;
    let percentage = (currentTime / duration) * 100;
    progressBar.style.width = `${percentage}%`;
});

volumeSlider.addEventListener("input", e => {
    mainVideo.volume = e.target.value;
    if (e.target.value == 0) {
        volumeButton.classList.replace("fa-volume-high", "fa-volume-xmark");
    } else {
        volumeButton.classList.replace("fa-volume-xmark", "fa-volume-high");
    }
});

volumeButton.addEventListener("click", () => {
    if (!volumeButton.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.5;
        volumeButton.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
        mainVideo.volume = 0.0;
        volumeButton.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeSlider.value = mainVideo.volume;
});

skipBackwardButton.addEventListener("click", () => {
    mainVideo.currentTime -= 5;
});

skipForwardButton.addEventListener("click", () => {
    mainVideo.currentTime += 5;
});

playPauseButton.addEventListener("click", () => {
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();
});

mainVideo.addEventListener("click", () => {
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();
});

mainVideo.addEventListener("play", () => {
    playPauseButton.classList.replace("fa-play", "fa-pause");
});

mainVideo.addEventListener("pause", () => {
    playPauseButton.classList.replace("fa-pause", "fa-play");
});

speedButton.addEventListener("click", () => {
    speedOptions.classList.toggle("show");
});

document.addEventListener("click", (e) => {
    if (e.target.className !== "material-symbols-rounded") {
        speedOptions.classList.remove("show");
    }
});

speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
        mainVideo.playbackRate = option.dataset.speed;
        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    });
});

picInPicButton.addEventListener("click", () => { 
    mainVideo.requestPictureInPicture();
});


fullscreenButton.addEventListener("click", () => { 
    container.classList.toggle("fullscreen");
    if (document.fullscreenElement) {
        fullscreenButton.classList.replace("fa-compress", "fa-expand");
        return document.exitFullscreen()
    }
    fullscreenButton.classList.replace("fa-expand", "fa-compress");
    container.requestFullscreen();
});
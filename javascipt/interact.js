let video = document.getElementById("vd");

video.addEventListener("ended", function () {
  this.currentTime = 0;
  this.play();
});

let audio = document.getElementById("audio");
let playpause = document.getElementById("play_pouse");
let song = document.getElementById("song");
let bar = document.getElementById("bar");
let time = document.getElementById("time");
let control = document.getElementById("volumeControl");
let onoff = false;

playpause.addEventListener("click", () => {
  switch (audio.paused) {
    case true:
      audio.play();
      playpause.textContent = "pause_circle";
      break;
    default:
      audio.pause();
      playpause.textContent = "play_circle";
      break;
  }
});

function timeUpdate(s) {
  let min = Math.floor(s / 60);
  let sec = Math.floor(s % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

audio.addEventListener("timeupdate", () => {
  let progress = (audio.currentTime / audio.duration) * 100;
  bar.value = progress;
  time.textContent = `${timeUpdate(audio.currentTime)}/${timeUpdate(audio.duration)}`;
});

bar.addEventListener("input", () => {
  let new_Time = (bar.value / 100) * audio.duration;
  audio.currentTime = new_Time;
});

audio.addEventListener("loadedmetadata", () => {
  bar.max = 100;
  time.textContent = `0:00/${timeUpdate(audio.duration)}`;
});

song.addEventListener("click", () => {
  switch (onoff) {
    case false:
      onoff = true;
      control.style = "width: 3vw;";
      break;
    default:
      onoff = false;
      control.style = "width: 0vw;";
      break;
  }
});

control.addEventListener("input", () => {
  audio.volume = control.value;

  if (audio.volume === 0) {
    song.textContent = "volume_mute";
  }
  if (audio.volume >= 0.5) {
    song.textContent = "volume_down";
  }
  if (audio.volume >= 0.8) {
    song.textContent = "volume_up";
  }
});

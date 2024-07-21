let currentlyPlayingButton = null;
let currentlyPlayingAudio = null;
let currentDownPlay = null;
function changeIcon(element) {
    const playIcon = 'play.png';
    const pauseIcon = 'pause.png';
    const downplay='./assets/player_icon3.png';
    const downpause='./assets/pause1.png';
    const audioId = element.getAttribute('data-audio-id');
    const audio = document.getElementById(audioId);
    const songContainer = document.querySelector('.song-info');
    const songImage = document.querySelector('.song-img');
    const songName = songContainer.querySelector('.song-name');
    const songSinger = songContainer.querySelector('.singer');
    const downControl = document.querySelector('.down-play');
    
    
    // If there's a button currently playing and it's not the one clicked, reset it
    if ( currentlyPlayingButton !== null && currentlyPlayingButton!==element) {
        currentlyPlayingButton.src = playIcon;
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio.currentTime = 0;
        console.log('Pausing current song');
    }

    // Toggle play/pause state of the clicked button
    if (element.src.includes(playIcon)) {
        element.src = pauseIcon;
        currentlyPlayingButton = element;
        downControl.src=downpause;
        currentlyPlayingAudio = audio;
        audio.play();
        // Update the song information
        const card = element.closest('.card');
        const cardImgSrc = card.querySelector('.card-img').src;
        const cardTitle = card.querySelector('.card-title').textContent;
        const cardSinger = card.querySelector('.card-info').textContent;

        songImage.src = cardImgSrc;
        songName.textContent = cardTitle;
        songSinger.textContent = cardSinger;
        console.log('Playing song');
    } else {
        element.src = playIcon;
        currentlyPlayingButton = null;
        downControl.src=downplay;
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
        console.log('Pausing and stopping song');
    }
    const audioPlayer = document.getElementById(audioId);
    const volumeControl = document.getElementById('volumeControl');
    
    
    // Set initial volume based on the range input value
    audioPlayer.volume = volumeControl.value / 100;
    
    // Update volume when range input changes
    volumeControl.addEventListener('input', (event) => {
    audioPlayer.volume = event.target.value / 100;
    let span=document.querySelector(".volumeicon");
    if(audioPlayer.volume===0){
        span.innerHTML="volume_off";
    }else if(audioPlayer.volume>=0.7){
        span.innerHTML="volume_up";
    } else{
        span.innerHTML="volume_down";
    } 
    });
    audio.addEventListener('timeupdate', () => {
        const progressBar = document.querySelector('.progress');
        const currTime = document.querySelector('.curr-time');
        const totTime = document.querySelector('.tot-time');
    
        const duration = audio.duration;
        const currentTime = audio.currentTime;
    
        progressBar.max = duration;
        progressBar.value = currentTime;
    
        currTime.textContent = formatTime(currentTime);
        totTime.textContent = formatTime(duration);
    });
    
    const progressBar = document.querySelector('.progress');
    progressBar.addEventListener('input', () => {
        audio.currentTime = progressBar.value;
    });
    
}



// Add event listeners to all play buttons
document.addEventListener('DOMContentLoaded', () => {
    const playButtons = document.querySelectorAll('.play-button .icon');
    playButtons.forEach(button => {
        button.addEventListener('click', () => changeIcon(button));
    });
})
let liked = document.querySelector(".liked");
liked.addEventListener("click", () => {
    if (liked.src.includes("like.jpg")) {
        liked.src = "/assets/liked.png";
    } else {
        liked.src = "/assets/like.jpg";
    }
});
let url = "https://open.spotify.com/search/";

let input = document.querySelector('#search');
input.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        let state = input.value;
        input.value="";
            getresult(state);
        }
    });

function getresult(state) {
    try {
        window.open(url + encodeURIComponent(state), '_blank');
    } catch (e) {
        console.log("error", e);
    }
}

const downControl=document.querySelector('.down-play');

function changeDownIcon() {
  const downplay = './assets/player_icon3.png';
  const downpause = './assets/pause1.png';

  let currentDownPlay = downControl.getAttribute('src');

if(currentlyPlayingAudio!==null)
{
  if (currentDownPlay === downplay) {
    downControl.setAttribute('src', downpause);
    currentlyPlayingAudio.play();
    if (currentlyPlayingButton) {
        currentlyPlayingButton.src = 'pause.png';
    }

  
  } else {
    downControl.setAttribute('src', downplay);
    currentlyPlayingAudio.pause();
    if (currentlyPlayingButton) {
        currentlyPlayingButton.src = 'play.png';
    }

  }
}
}

downControl.addEventListener('click', changeDownIcon);
function playPreviousAudio() {
    if (currentlyPlayingAudio) {
        const currentId = currentlyPlayingAudio.id;
        const currentNumber = parseInt(currentId.replace('audio', ''), 10);
        const previousNumber = currentNumber - 1;
        const previousAudioId = `audio${previousNumber}`;
        const previousAudioElement = document.querySelector(`[data-audio-id="${previousAudioId}"]`);
        if (previousAudioElement) {
            changeIcon(previousAudioElement);
        } else {
            console.log('No previous audio available');
        }
    } else {
        console.log('No audio currently playing');
    }
}



function playNextAudio() {
    if (currentlyPlayingAudio) {
        const currentId = currentlyPlayingAudio.id;
        const currentNumber = parseInt(currentId.replace('audio', ''), 10);
        const nextNumber = currentNumber + 1;
        const nextAudioId = `audio${nextNumber}`;
        const nextAudioElement = document.querySelector(`[data-audio-id="${nextAudioId}"]`);
        
        if (nextAudioElement) {
            changeIcon(nextAudioElement);
        } else {
            console.log('No next audio available');
        }
    } else {
        console.log('No audio currently playing');
    }
}

const backward = document.querySelector('.backward');
backward.addEventListener('click', playPreviousAudio);
const forward = document.querySelector('.forward');
forward.addEventListener('click', playNextAudio);
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// ==========================
// Song List
// ==========================

const songs = [
{
    title: "Perfect",
    artist: "Ed Sheeran",
    src: "songs/song1.mp3",
    cover: "images/imag1.jpg"
},
{
    title: "Believer",
    artist: "Imagine Dragons",
    src: "songs/song2.mp3",
    cover: "images/imag2.jpg"
},
{
    title: "Faded",
    artist: "Alan Walker",
    src: "songs/song3.mp3",
    cover: "images/imag3.jpg"
},
// {
//     title: "Love Me Like You Do",
//     artist: "Ellie Goulding",
//     src: "songs/song4.mp3",
//     cover: "images/imag.4.jpg"
// }
];

// ==========================
// Elements
// ==========================

const audio = document.getElementById("audio");

const cover = document.getElementById("cover");

const title = document.getElementById("title");

const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");

const prevBtn = document.getElementById("prev");

const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");

const current = document.getElementById("current");

const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");

const volume = document.getElementById("volume");

const shuffle = document.getElementById("shuffle");

const repeat = document.getElementById("repeat");

// ==========================

let songIndex = 0;

let isPlaying = false;

let shuffleMode = false;

let repeatMode = false;

// ==========================
// Load Song
// ==========================

function loadSong(index){

title.innerText=songs[index].title;

artist.innerText=songs[index].artist;

cover.src=songs[index].cover;

audio.src=songs[index].src;

highlightSong();

}

// ==========================
// Play Song
// ==========================

function playSong(){

audio.play();

isPlaying=true;

playBtn.innerHTML='<i class="fas fa-pause"></i>';

cover.classList.add("rotate");

}

// ==========================
// Pause Song
// ==========================

function pauseSong(){

audio.pause();

isPlaying=false;

playBtn.innerHTML='<i class="fas fa-play"></i>';

cover.classList.remove("rotate");

}

// ==========================
// Play Button
// ==========================

playBtn.addEventListener("click",()=>{

if(isPlaying){

pauseSong();

}else{

playSong();

}

});

// ==========================
// Previous Song
// ==========================

function previousSong(){

songIndex--;

if(songIndex<0){

songIndex=songs.length-1;

}

loadSong(songIndex);

playSong();

}

// ==========================
// Next Song
// ==========================

function nextSong(){

songIndex++;

if(songIndex>=songs.length){

songIndex=0;

}

loadSong(songIndex);

playSong();

}

prevBtn.addEventListener("click",previousSong);

nextBtn.addEventListener("click",nextSong);

// Load First Song

loadSong(songIndex);
// ==========================
// Progress Bar & Time
// ==========================

audio.addEventListener("timeupdate", updateProgress);

function updateProgress() {

    const { duration, currentTime } = audio;

    if (duration) {

        const progressPercent = (currentTime / duration) * 100;

        progress.value = progressPercent;

        current.innerText = formatTime(currentTime);

        document.getElementById("duration").innerText =
            formatTime(duration);

    }

}

// ==========================
// Seek Song
// ==========================

progress.addEventListener("input", () => {

    const seekTime =
        (progress.value / 100) * audio.duration;

    audio.currentTime = seekTime;

});

// ==========================
// Time Format
// ==========================

function formatTime(time) {

    const minutes = Math.floor(time / 60);

    let seconds = Math.floor(time % 60);

    if (seconds < 10) {

        seconds = "0" + seconds;

    }

    return `${minutes}:${seconds}`;

}

// ==========================
// Volume Control
// ==========================

volume.addEventListener("input", () => {

    audio.volume = volume.value / 100;

});

// Default Volume

audio.volume = 1;

// ==========================
// Auto Play Next Song
// ==========================

audio.addEventListener("ended", () => {

    if (repeatMode) {

        audio.currentTime = 0;

        playSong();

    } else {

        nextSong();

    }

});
// ==========================
// Create Playlist
// ==========================

function createPlaylist() {

    playlist.innerHTML = "";

    songs.forEach((song, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <div class="song-name">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
        `;

        li.addEventListener("click", () => {

            songIndex = index;

            loadSong(songIndex);

            playSong();

        });

        playlist.appendChild(li);

    });

}

// ==========================
// Highlight Active Song
// ==========================

function highlightSong() {

    const items = document.querySelectorAll("#playlist li");

    items.forEach((item, index) => {

        item.classList.remove("active");

        if (index === songIndex) {

            item.classList.add("active");

        }

    });

}

// ==========================
// Shuffle Button
// ==========================

shuffle.addEventListener("click", () => {

    shuffleMode = !shuffleMode;

    shuffle.style.color = shuffleMode ? "#1DB954" : "#ffffff";

});

// ==========================
// Repeat Button
// ==========================

repeat.addEventListener("click", () => {

    repeatMode = !repeatMode;

    repeat.style.color = repeatMode ? "#1DB954" : "#ffffff";

});

// ==========================
// Next Song (Shuffle Support)
// ==========================

function nextSong() {

    if (shuffleMode) {

        songIndex = Math.floor(Math.random() * songs.length);

    } else {

        songIndex++;

        if (songIndex >= songs.length) {

            songIndex = 0;

        }

    }

    loadSong(songIndex);

    playSong();

}

// ==========================
// Previous Song
// ==========================

function previousSong() {

    songIndex--;

    if (songIndex < 0) {

        songIndex = songs.length - 1;

    }

    loadSong(songIndex);

    playSong();

}

// ==========================
// Initialize
// ==========================

createPlaylist();

loadSong(songIndex);

highlightSong();

const albums = [
  {
    title: "Aaron",
    songs: [
      {
        title: "Song 1",
        src:"./Aaron.mp3" 
      }
    ]
  },
  {
    title: "Altes",
    songs: [
      {
        title: "Song 2",
        src: "./AltesKamuffel.mp3"
      }
    ]
  }
];

const albumElements = document.querySelectorAll(".album");
const player = document.querySelector("#music-player");
const songTitle = document.querySelector("#song-title");
const progressBar = document.querySelector("#progress-bar");
const progress = document.querySelector("#progress");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

let currentAlbum = albums[0];

albumElements.forEach((albumElement, index) => {
  albumElement.addEventListener("click", () => {
    currentAlbum = albums[index];
    songTitle.innerHTML = currentAlbum.songs[0].title;
    player.src = currentAlbum.songs[0].src;
    player.play();
  });
});

player.addEventListener("timeupdate", () => {
  progress.style.width = `${(player.currentTime / player.duration) * 100}%`;
});

searchButton.addEventListener("click", () => {
  const searchedAlbum = albums.find(album => album.title.toLowerCase().includes(searchInput.value.toLowerCase()));
  if (searchedAlbum) {
    currentAlbum = searchedAlbum;
    songTitle.innerHTML = currentAlbum.songs[0].title;
    player.src = currentAlbum.songs[0].src;
    player.play();
  }
});



const albums = [
  {
    title: "Aaron",
    artist: "Hello",
    songs: [
      {
        title: "Aaron",
        src: "./Aaron.mp3"
      },
      {
        title: "Altes%)",
        src: "./AltesKamuffel.mp3"
      },
    ]
  },
  {
    title: "Altes",
    artist: "Hello",
    songs: [
      {
        title: "Altes%)",
        src: "./AltesKamuffel.mp3"
      },
      {
        title: "Aaro",
        src: "./Aaron.mp3"
      },
      { title: "Aaaron", src: "./Aaron.mp3" },
    ]
  }

];




// const albumsArr = [album1, album2];
const albumElements = document.querySelectorAll(".album");
const player = document.querySelector("#music-player");
const songTitle = document.querySelector("#song-title");
const progressBar = document.querySelector("#progress-bar");
const progress = document.querySelector("#progress");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
// const playlist = document.querySelector('.player-container');


let currentAlbum = albums[0];

const displayAlbums = () => {
  albumList.innerHTML = "";
  for (const albumKey in albums) {
    const album = albums[albumKey];
    albumList.innerHTML += `
      <div class="album" data-album="${albumKey}">
        ${album.title} ${album.artist}
      </div>
    `;
  }
};

albumElements.forEach((albumElement, index) => {

  albumElement.addEventListener("click", () => {
    currentAlbum = albums[index];
    songTitle.innerHTML = currentAlbum.songs[0].title;
    player.src = currentAlbum.songs[0].src;
    player.play();

  });

});

player.addEventListener("timeupdate", () => {
  waveform.style.width = `${(player.currentTime / player.duration) * 100}%`;
});

waveform.addEventListener("timeupdate", () => {
  waveform.style.width = `${(waveform.currentTime / waveform.duration) * 100}%`;
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

// Playlist


function displayPlaylist(index) {
  document.querySelectorAll('.playlist').forEach(el => {
    el.style.display = 'none';
  });
  const playlist = document.getElementById(`playlist-${index}`);
  playlist.style.display = 'block';
}
function playSong(src) {
  document.getElementById('music-player').src = src;
  document.getElementById('music-player').play();
}
albums.forEach((album, index) => {
  const playlist = document.createElement('div');
  playlist.classList.add('playlist');
  playlist.id = `playlist-${index}`;
  playlist.innerHTML = `
    <h3>${album.title}</h3>
    <ol class="ol-playlist">
    ${album.songs.map(song => `<li class="playsong-li"><a class="playsong" href="#" onclick="playSong('${song.src}')">${song.title}</a> <a class="playsong-artist" href="#">${album.artist}</a></li>`)}
      </ol>`;
  document.getElementById('playlist').appendChild(playlist);
});




// wave


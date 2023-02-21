
fetch('albums.json')
  .then(response => response.json())
  .then(albums => {

    const albumElements = document.querySelectorAll(".album");
    const player = document.querySelector("#music-player");
    const songTitle = document.querySelector("#song-title");
    const playlistElements = [];
    const albumArtist = document.getElementsByClassName("album-title__artist");

    let currentAlbum = albums[0];

    const displayAlbums = (albums = []) => {
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
        // songTitle.innerHTML = currentAlbum.songs[0].title;
        player.src = currentAlbum.songs[0].src;
        player.play();
        displayPlaylist(index);
      });
    });
    const displayPlaylist = (index) => {
      playlistElements.forEach((playlist) => {
        playlist.style.display = "none";
      });
      const playlist = playlistElements[index];
      playlist.style.display = "block";

      const songs = playlist.querySelectorAll(".playsong-link");
      const player = document.querySelector("#music-player");
      let isPlaying = false;

      songs.forEach((song) => {
        const playButton = document.createElement("button");
        playButton.classList.add("play-button");
        playButton.innerHTML = '<i class="fas fa-play"></i>';

        playButton.addEventListener("click", () => {
          if (!isPlaying) {
            isPlaying = true;
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
            playSong(song.dataset.songTitle, song.dataset.songSrc, playlist);
          } else {
            isPlaying = false;
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            pauseSong(player);
          }
        });

        const songLi = song.closest(".playsong-li");
        songLi.addEventListener("mouseover", () => {
          // show play button on hover
          songLi.appendChild(playButton);
        });

        songLi.addEventListener("mouseleave", () => {
          // remove play button on mouseleave
          songLi.removeChild(playButton);
        });
      });
    };


    albums.forEach((album, index) => {
      currentAlbum = albums[index];
      const song = document.querySelectorAll('song');
      const playlist = document.createElement("div");
      playlist.classList.add("playlist");
      playlist.id = `playlist-${index}`;
      playlist.style.display = "none";
      playlist.innerHTML = `
      <div class="album-info">
      <img class="album-info__cover" src="${album.cover}">
      <div class="album-text">
    
      <h3 class="  album-text__song-title">${song.title}</h3>
        <h3 class="album-text__album-name">${album.name}</h3>
        <h3 class="album-text__album-artist">${album.artist}</h3>
        </div>
        </div>
        <div id="waveform" class="playlist-waveform"></div>
        <ol class="ol-playlist">
          ${album.songs
          .map(
            (song) =>
              `<li class="playsong-li"> 
              <div class="playsong-waveform"></div>
              <a class="playsong-link" href="#" 
                  data-song-title="${song.title}" 
                  data-song-src="${song.src}" 
                  data-song-duration="${song.duration}">
                  ${song.title}
              </a>
              <a class="playsong-artist" href="#">${album.name}</a>
              <span class="playsong-duration">${song.duration}</span>
            </li>
            `
          )
          .join("")}
        </ol>
      `;

      document.getElementById("playlist").appendChild(playlist);
      playlistElements.push(playlist);
      playSong(song.title, song.src, playlist);
    });


    //search
    const searchInput = document.getElementById("search-input");
    const searchAlbum = () => {
      const searchValue = searchInput.value.toLowerCase();
      const filteredAlbums = albums.filter(album =>
        album.artist.toLowerCase().includes(searchValue) ||
        album.name.toLowerCase().includes(searchValue)
      );

      if (filteredAlbums.length > 0) {
        currentAlbum = filteredAlbums[0];
        // songTitle.innerHTML = currentAlbum.songs[0].title;
        player.src = currentAlbum.songs[0].src;
        player.play();
        displayPlaylist(albums.indexOf(currentAlbum));
      }
    };
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener("click", searchAlbum);
  });


// play and pause song when clicked
function playSong(title, src, playlist) {
  const player = document.querySelector("#music-player");
  // const waveformSong = document.querySelector("#waveform-song");
  const songTitle = title;

  playlist.querySelector('.album-text__song-title').textContent = songTitle;
  player.src = src;

  const waveform = playlist.querySelector("#waveform");

  player.addEventListener("timeupdate", () => {
    const progress = player.currentTime / player.duration;
    waveform.style.width = `${progress * 100}%`;
  });

  player.addEventListener("canplaythrough", () => {
    isPlaying = true;
    player.play();
  });
}

function pauseSong() {
  const player = document.querySelector("#music-player");
  isPlaying = false;
  player.pause();

}





fetch('albums.json')
  .then(response => response.json())
  .then(albums => {

    const albumElements = document.querySelectorAll(".album");
    const player = document.querySelector("#music-player");
    const songTitle = document.querySelector("#song-title");
    const playlistElements = [];
    // const albumArtist = document.getElementsByClassName("album-title__artist");
    let currentAlbum = albums[0];

    const displayAlbums = (albums = []) => {
      const albumList = document.querySelector("#album-list");
      albumList.innerHTML = "";
      for (const albumKey of albums) {
        const album = albums[albumKey];
        const albumElement = document.createElement("div");
        albumElement.classList.add("album");
        albumElement.setAttribute("data-album", albumKey);
        albumElement.innerHTML = `${album.title} ${album.artist}`;
        albumList.appendChild(albumElement);
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
      if (!playlist) {
        return;
      }
      playlist.style.display = "block";

      const songs = playlist.querySelectorAll(".playsong-link");
      let isPlaying = false;

      songs.forEach((song) => {
        // check if button exists
        const playButton = song.querySelector(".play-button");
        if (!playButton) {
          // create button if it doesn't exist
          const newPlayButton = document.createElement("button");
          newPlayButton.classList.add("play-button");
          newPlayButton.innerHTML = '<i class="fas fa-play"></i>';
          song.appendChild(newPlayButton);

          newPlayButton.addEventListener("click", () => {
            if (!isPlaying) {
              isPlaying = true;
              newPlayButton.innerHTML = '<i class="fas fa-pause"></i>';
              playSong(song.dataset.songTitle, song.dataset.songSrc, playlist);
              songLi.appendChild(equalizer);
            } else {
              isPlaying = false;
              newPlayButton.innerHTML = '<i class="fas fa-play"></i>';
              pauseSong(player);
            }
          });
          


          
          const songLi = song.closest(".playsong-li");
          songLi.addEventListener("mouseover", () => {
            // show play button on hover
            const playButton = songLi.querySelector(".play-button");
            if (playButton) {
              playButton.style.display = "block";
            }

          });

          songLi.addEventListener("mouseleave", () => {
            // hide play button on mouseleave
            const playButton = songLi.querySelector(".play-button");
            if (playButton) {
              playButton.style.display = "none";
            }
          });
        }
      });
    };

    albums.forEach((album, index) => {
      currentAlbum = albums[index];
      // const song = document.querySelectorAll('song');
      const playlist = document.createElement("div");
      playlist.classList.add("playlist");
      playlist.id = `playlist-${index}`;
      playlist.style.display = "none";
      playlist.innerHTML = `
      <div class="album-info">
      <img class="album-info__cover" src="${album.cover}">
      <div class="album-text">
    
      <h3 class="album-text__song-title">${album.songs[0].title}</h3>

        <h3 class="album-text__album-name">${album.name}</h3>
        <h3 class="album-text__album-artist">${album.artist}</h3>
        </div>
        </div>
        <div id="waveform" class="playlist-waveform"></div>
        <ol class="ol-playlist">
          ${album.songs
          .map(
            (song) =>
              `<li id="songLi" class="playsong-li"> 
              <div class="waveform-song" id="waveform-song">
              
          </div>
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
      // playSong(song.title, song.src, playlist);
    });


    //search
    // const albumContainer = document.getElementById('album-container')
    const searchInput = document.getElementById("search-input");


    const searchAlbum = () => {
      const searchValue = searchInput.value.toLowerCase();
      const filteredAlbums = albums.filter(album =>
        album.artist.toLowerCase().includes(searchValue) ||
        album.name.toLowerCase().includes(searchValue)
      );

      if (filteredAlbums.length > 0) {
        currentAlbum = filteredAlbums[0];
        player.src = currentAlbum.songs[0].src;
        player.play();

        // clear current albums from container
        // albumContainer.innerHTML = "";

        // display searched album
        const albumDiv = document.createElement("div");
        albumDiv.className = "album";
        albumDiv.innerHTML = `
      <img src="${currentAlbum.cover}" alt="${currentAlbum.name}" />
      <div class="album-info">
        <h2>${currentAlbum.name}</h2>
        <p>${currentAlbum.artist}</p>
      </div>
    `;
        // albumContainer.appendChild(albumDiv);

        // display playlist for searched album
        displayPlaylist(albums.indexOf(currentAlbum));
      }
    };

    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener("click", searchAlbum);

    searchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
      }
    });
  });
let isPlaying = false;

function playSong(title, src, playlist) {
  const player = document.querySelector("#music-player");

  // const waveformSong = document.querySelector("#waveform-song");
  const songTitle = title;

  playlist.querySelector('.album-text__song-title').textContent = songTitle;
  player.src = src;

  const waveform = playlist.querySelector("#waveform");
  const equalizer = document.querySelector("#equalizer");

  // remove equalizer from  previously playing song
  const prevPlayingSong = document.querySelector(".song-li.playing");
  if (prevPlayingSong) {
    const prevEqualizer = prevPlayingSong.querySelector("equalizer");
    if (prevEqualizer) {
      prevEqualizer.style.display = "none";
    }
  }
  equalizer.style.display = "flex";

  player.addEventListener("timeupdate", () => {
    const progress = player.currentTime / player.duration;
    waveform.style.width = `${progress * 100}%`;
    equalizer.style.display = `${progress * 100}%`;
  });

  player.addEventListener("canplaythrough", () => {
    isPlaying = true;

    player.play();
    equalizer.style.display = "flex";

  });

  player.addEventListener("pause", () => {
    isPlaying = false;
    equalizer.style.display = "none";

  });

  playlist.addEventListener("mouseenter", () => {
    if (isPlaying) {
      equalizer.style.display = "none";
    }
  });

  playlist.addEventListener("mouseleave", () => {
    if (isPlaying) {
      equalizer.style.display = "flex";
    }
  });
}


function pauseSong() {
  const player = document.querySelector("#music-player");
  const equalizer = document.querySelector(".equalizer");

  isPlaying = false;
  player.pause();
  equalizer.style.display = "none";
}




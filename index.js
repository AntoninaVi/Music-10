
fetch('albums.json')
  .then(response => response.json())
  .then(albums => {

    const albumElements = document.querySelectorAll(".album");
    const player = document.querySelector("#music-player");
    const songTitle = document.querySelector("#song-title");
    const progressBar = document.querySelector("#progress-bar");
    const progress = document.querySelector("#progress");
    const playlistElements = [];

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
        displayPlaylist(index);
      });
    });

    const displayPlaylist = (index) => {
      playlistElements.forEach((playlist) => {
        playlist.style.display = "none";
      });
      const playlist = playlistElements[index];
      playlist.style.display = "block";
    };

    albums.forEach((album, index) => {
      currentAlbum = albums[index];
      const playlist = document.createElement("div");
      playlist.classList.add("playlist");
      playlist.id = `playlist-${index}`;
      playlist.style.display = "none";
      playlist.innerHTML = `
        <h3>${currentAlbum.title}</h3>
        <ol class="ol-playlist">
          ${album.songs
          .map(
            (song) =>
              `<li class="playsong-li"><a class="playsong" href="#" onclick="playSong('${song.title}', '${song.src}')">${song.title}</a>
                  <a class="playsong-artist" href="#">${album.name}</a></li>`
          )
          .join("")}
        </ol>
      `;

      document.getElementById("playlist").appendChild(playlist);
      playlistElements.push(playlist);
    });

    player.addEventListener("timeupdate", () => {
      waveform.style.width = `${(player.currentTime / player.duration) * 100}%`;
    });

    waveform.addEventListener("timeupdate", () => {
      waveform.style.width = `${(waveform.currentTime / waveform.duration) * 100}%`;
    });

    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", () => {
      const searchedAlbum = albums.find((album) =>
        album.name.toLowerCase().includes(searchInput.value.toLowerCase())
      );

      if (searchedAlbum) {
        currentAlbum = searchedAlbum;
        songTitle.innerHTML = currentAlbum.songs[0].title;
        player.src = currentAlbum.songs[0].src;
        player.play();
        displayPlaylist(albums.indexOf(searchedAlbum));
      }
    });
  });

function playSong(title, src) {
  const player = document.querySelector("#music-player");
  const songTitle = document.querySelector("#song-title");
  songTitle.innerHTML = title;
  player.src = src;
  player.addEventListener('canplaythrough', () => {
    player.play();
  });
};








fetch('albums.json')
  .then(response => response.json())
  .then(albums => {

    const albumElements = document.querySelectorAll(".album");
    const player = document.querySelector("#music-player");
    const songTitle = document.querySelector("#song-title");
    const playlistElements = [];
    const albumArtist = document.getElementsByClassName("album-title__artist");

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
      const song = document.querySelectorAll('song');
      const playlist = document.createElement("div");

      playlist.classList.add("playlist");
      playlist.id = `playlist-${index}`;
      playlist.style.display = "none";
      playlist.innerHTML = `
      <div class="album-info">
      <img class="album-info__cover" src="${album.cover}">
      <div class="album-text">
        <h3 class="album-text__album-name">${album.name}</h3>
        <h3 class="album-text__album-artist">${album.artist}</h3>
        
        
        </div>
        </div>
        
        
        <ol class="ol-playlist">
          ${album.songs
          .map(
            (song) =>
              `<li class="playsong-li"><a class="playsong" href="#" onclick="playSong('${song.title}', '${song.src}')">${song.title}</a>
                  <a class="playsong-artist" href="#">${album.name}</a>
                  <span class="playsong-duration">${song.duration}</span>
                  </li>`
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

    // waveform.addEventListener("timeupdate", () => {
    //   waveform.style.width = `${(waveform.currentTime / waveform.duration) * 100}%`;
    // });

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
        playlist.innerHTML = `  <h3 class="album-text__song-title">${currentAlbum.songs[0].title}</h3>`
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

// Buttons



const addPlayButtons = () => {
  const songs = document.querySelectorAll('.playsong');
  songs.forEach(song => {
    const playButton = document.createElement('button');
    playButton.classList.add('play-btn');
    playButton.innerHTML = '<i class="fa fa-play"></i>';
    song.parentElement.appendChild(playButton);
  });
  addPlayButtons();
document.addEventListener('mouseover', (event) => {
  const target = event.target;
  if (target.classList.contains('playsong')) {
    const playButton = target.parentElement.querySelector('.play-btn');
    playButton.style.display = 'inline-block';
  }
});
};


document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('play-btn')) {
    const song = target.parentElement.querySelector('.playsong');
    const audioSrc = song.getAttribute('data-src');
    const audioTitle = song.textContent;
    const albumName = song.nextElementSibling.textContent;
    const songTitle = document.querySelector('.song__title');
    playerTitle.textContent = `${songTitle} - ${albumName}`;
    player.src = audioSrc;
    player.play();
    target.style.display = 'none';
  }
});
document.addEventListener('mouseover', (event) => {
  const target = event.target;
  if (target.classList.contains('playsong') && !player.paused) {
    const pauseButton = target.parentElement.querySelector('.pause-btn');
    if (!pauseButton) {
      const newButton = document.createElement('button');
      newButton.classList.add('pause-btn');
      newButton.innerHTML = '<i class="fa fa-pause"></i>';
      target.parentElement.appendChild(newButton);
    } else {
      pauseButton.style.display = 'inline-block';
    }
  }
});
document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('pause-btn')) {
    const song = target.parentElement.querySelector('.playsong');
    const playButton = target.parentElement.querySelector('.play-btn');
    player.pause();
    target.style.display = 'none';
    playButton.style.display = 'inline-block';
  }
});
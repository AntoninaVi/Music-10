
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


    // const displayPlaylist = (index) => {
    //   playlistElements.forEach((playlist) => {
    //     playlist.style.display = "none";
    //   });
    //   const playlist = playlistElements[index];
    //   playlist.style.display = "block";
    // };
    const displayPlaylist = (index) => {
      playlistElements.forEach((playlist) => {
        playlist.style.display = "none";
      });
      const playlist = playlistElements[index];
      playlist.style.display = "block";
    
      
      const songs = playlist.querySelectorAll(".playsong-link");
      songs.forEach((song) => {
        const playButton = document.createElement("button");
        playButton.classList.add("play-button");
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    
        let isPlaying = false;
        // let waveformSong;
    
        playButton.addEventListener("click", () => {
          if (!isPlaying) {
           
            isPlaying = true;
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
            playSong(song.dataset.songTitle, song.dataset.songSrc);
    
           
            // waveformSong = song.parentElement.querySelector(".playsong-waveform");
            // waveformSong.style.display = "block";
          } else {
         
            isPlaying = false;
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            pauseSong();
    
            
            // waveformSong.style.display = "none";
          }
        });
    
        song.addEventListener("mouseover", () => {
        
          song.appendChild(playButton);
        });
    
        song.addEventListener("mouseleave", () => {
         
          song.removeChild(playButton);
        });
      });
    };
    
      
      // const displayWaveform = (waveformSong, isPlaying) => {
      //   if (isPlaying) {
      //     waveformSong.style.display = "block";
      //   } else {
      //     waveformSong.style.display = "none";
      //   }
      // };

    
 
    
    




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


    // const addPlayPauseButton = () => {
    //   const playButtons = document.querySelectorAll('.playsong-buttons');
    //   const player = document.querySelector('#music-player');
    
    //   if (!player) {
    //     console.error('Music not found.');
    //     return;
    //   }
    
    //   if (playButtons) {
    //     playButtons.forEach((button) => {
    //       const image = document.createElement("img");
    //       image.classList.add('equalizer');
    //       image.setAttribute('src', 'img/equalizer.svg');
    //       button.appendChild(image);
    //       image.style.display = "none"; // initially hide the image
    
    //       button.addEventListener('click', () => {
    //         if (player.paused) {
    //           player.play();
    //           button.classList.remove('play');
    //           button.classList.add('pause');
    //           image.style.display = "block";
    //         } else {
    //           player.pause();
    //           button.classList.remove('pause');
    //           button.classList.add('play');
    //           image.style.display = "none";
    //         }
    //       });
    //     });
    //   }
    // };

    

    // addPlayPauseButton();

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
function pauseSong() {
  const player = document.querySelector("#music-player");
  player.pause();
}


// Buttons



// const playPauseBtn = document.getElementById('play-pause-btn');
// const player = document.querySelector('#music-player');

// playPauseBtn.addEventListener('click', () => {
//   if (player.paused) {
//     player.play();
//     playPauseBtn.classList.remove('play-btn');
//     playPauseBtn.classList.add('pause-btn');
//   } else {
//     player.pause();
//     playPauseBtn.classList.remove('pause-btn');
//     playPauseBtn.classList.add('play-btn');
//   }
// });

// player.addEventListener('play', () => {
//   playPauseBtn.classList.remove('play-btn');
//   playPauseBtn.classList.add('pause-btn');
// });

// player.addEventListener('pause', () => {
//   playPauseBtn.classList.remove('pause-btn');
//   playPauseBtn.classList.add('play-btn');
// });

// playPauseBtn.addEventListener("click", function() {
//   if (player.paused) {
//     player.play();
//     playPauseBtn.innerHTML = '<i class="fa fa-pause"></i>';
//   } else {
//     player.pause();
//     playPauseBtn.innerHTML = '<i class="fa fa-play"></i>';
//   }
// });

// playPauseBtn.addEventListener("click", () => {
//   if (player.paused) {
//     player.play();
//     playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
//   } else {
//     player.pause();
//     playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
//   }
// });



// fetch('albums.json')
//   .then(response => response.json())
//   .then(albums => {

//     // const albumsArr = [album1, album2];

//     const albumElements = document.querySelectorAll(".album");
//     const player = document.querySelector("#music-player");
//     const songTitle = document.querySelector("#song-title");
//     // const progressBar = document.querySelector("#progress-bar");
//     // const progress = document.querySelector("#progress");
//     const searchInput = document.querySelector("#search-input");
//     const searchButton = document.querySelector("#search-button");
//     const playlist = document.getElementById('playlist');

//     let currentAlbum = albums[0];

//     albumElements.forEach((albumElement, index) => {
//       albumElement.addEventListener("click", () => {
//         currentAlbum = albums[index];
//         songTitle.innerHTML = currentAlbum.songs[0].title;
//         player.src = currentAlbum.songs[0].src;
//         player.play();

//       });

//     });

//     // player.addEventListener("timeupdate", () => {
//     //   waveform.style.width = `${(player.currentTime / player.duration) * 100}%`;
//     // });

//     // waveform.addEventListener("timeupdate", () => {
//     //   waveform.style.width = `${(waveform.currentTime / waveform.duration) * 100}%`;
//     // });


//     searchButton.addEventListener("click", () => {
//       const searchedAlbum = albums.find(album => album.title.toLowerCase().includes(searchInput.value.toLowerCase()));
//       if (searchedAlbum) {
//         currentAlbum = searchedAlbum;
//         songTitle.innerHTML = currentAlbum.songs[0].title;
//         player.src = currentAlbum.songs[0].src;
//         player.play();
//       }
//     });


//     // function playSong(src) {
//     //   document.getElementById('music-player').src = src;
//     //   document.getElementById('music-player').play();
//     // }



//     // function displayPlaylist(index) {
//     //   const allPlaylists = document.getElementById('playlist').children;
//     //   for (let i = 0; i < allPlaylists.length; i++) {
//     //     allPlaylists[i].style.display = 'none';
//     //   }
//     //   const selectedPlaylist = document.getElementById(`playlist-${index}`);
//     //   if (selectedPlaylist) {
//     //     selectedPlaylist.style.display = 'block';
//     //   }
//     // }
//     function displayPlaylist(index) {
//       const allPlaylists = document.getElementById('playlist-container').children;
//       for (let i = 0; i < allPlaylists.length; i++) {
//         allPlaylists[i].style.display = 'none';
//       }
//       const selectedPlaylist = document.getElementById(`playlist-${index}`);
//       if (selectedPlaylist) {
//         selectedPlaylist.style.display = 'block';
//       }
//     }



//   });
//   async function displayAlbums() {
//     const response = await fetch('albums.json');
//     const albums = await response.json();

//     const playlistContainer = document.getElementById('playlist');
//     albums.forEach((album, index) => {
//       const playlist = document.createElement('div');
//       playlist.classList.add('playlist');
//       playlist.id = `playlist-${index}`;
//       playlist.style.display = 'none';

//       playlist.innerHTML = `
//         <h3>${album.title}</h3>
//         <ol class="ol-playlist">
//           ${album.songs.map(song => `<li class="playsong-li"><a class="playsong" href="#">${song.title}</a> <a class="playsong-artist" href="#">${album.artist}</a></li>`)}
//         </ol>
//       `;

//       playlistContainer.appendChild(playlist);
//     });

//     const albumsContainer = document.getElementById('albums');
//     albums.forEach((album, index) => {
//       const albumEl = document.createElement('div');
//       albumEl.classList.add('album');

//       albumEl.innerHTML = `
//         <div class="album-cover">
//           <img src="${album.cover}" alt="${album.title}">
//         </div>
//         <div class="album-info">
//           <h2 class="album-title">${album.title}</h2>
//           <p class="album-artist">${album.artist}</p>
//         </div>
//       `;

//       albumEl.addEventListener('click', () => {
//         displayPlaylist(index);
//       });

//       albumsContainer.appendChild(albumEl);
//     });
//   }






// const albums = [
//   {
//     title: "Aaron",
//     artist: "Hello",
//     songs: [
//       {
//         title: "Aaron",
//         src: "./Aaron.mp3"
//       },
//       {
//         title: "Altes%)",
//         src: "./AltesKamuffel.mp3"
//       },
//     ]
//   },
//   {
//     title: "Altes",
//     artist: "Hello",
//     songs: [
//       {
//         title: "Altes%)",
//         src: "./AltesKamuffel.mp3"
//       },
//       {
//         title: "Aaro",
//         src: "./Aaron.mp3"
//       },
//       { title: "Aaaron", src: "./Aaron.mp3" },
//     ]
//   }

// ];


fetch('albums.json')
  .then(response => response.json())
  .then(albums => {

    // const albumsArr = [album1, album2];
    const albumElements = document.querySelectorAll(".album");
    const player = document.querySelector("#music-player");
    const songTitle = document.querySelector("#song-title");
    const progressBar = document.querySelector("#progress-bar");
    const progress = document.querySelector("#progress");



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
        displayPlaylist()
      });
    });
  

    player.addEventListener("timeupdate", () => {
      waveform.style.width = `${(player.currentTime / player.duration) * 100}%`;
    });

    waveform.addEventListener("timeupdate", () => {
      waveform.style.width = `${(waveform.currentTime / waveform.duration) * 100}%`;
    });
  });


// Playlist
function displayPlaylist(index) {
  const playlists = document.querySelectorAll('.playlist');
  const playlist = document.querySelector(`#playlist-${index}`);
  if (playlist) {
    playlists.forEach((p) => p.style.display = 'block');
    playlist.style.display = 'none';
  }
}








fetch('albums.json')
  .then(response => response.json())
  .then(albums => {
    albums.forEach((album, index) => {
      const playlist = document.createElement('div');
      playlist.classList.add('playlist');
      playlist.id = `playlist-${index}`;
      playlist.innerHTML = `
    <h3>${album.title}</h3>
    <ol class="ol-playlist">
    ${album.songs.map(song => `<li class="playsong-li"><a class="playsong" href="#" onclick="playSong('${song.title}', '${song.src}')">${song.title}</a>
    <a class="playsong-artist" href="#">${album.artist}</a></li>`)}
      </ol>`;

      document.getElementById('playlist').appendChild(playlist);

      const searchInput = document.getElementById("search-input");
      const searchButton = document.getElementById("search-button");
      const songTitle = document.querySelector("#song-title");
      const player = document.querySelector("#music-player");
      searchButton.addEventListener("click", () => {

        const searchedAlbum = albums.find(album => album.name.toLowerCase().includes(searchInput.value.toLowerCase()));
        if (searchedAlbum) {
          currentAlbum = searchedAlbum;
          songTitle.innerHTML = currentAlbum.songs[0].title;
          player.src = currentAlbum.songs[0].src;
          player.play();
          displayPlaylist(albums.indexOf(searchedAlbum));
          
        }
      });

    }
    )


  });

function playSong(title, src) {
  const player = document.querySelector('#music-player');
  const songTitle = document.querySelector('#song-title');

  songTitle.innerHTML = title;
  player.src = src;
  player.addEventListener('canplaythrough', () => {
    player.play();
  });
};







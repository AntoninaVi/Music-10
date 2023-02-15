
fetch('albums.json')
  .then(response => response.json())
  .then(albums => {

    // const albumsArr = [album1, album2];

    const albumElements = document.querySelectorAll(".album");
    const player = document.querySelector("#music-player");
    const songTitle = document.querySelector("#song-title");
    const progressBar = document.querySelector("#progress-bar");
    const progress = document.querySelector("#progress");
    const searchInput = document.querySelector("#search-input");
    const searchButton = document.querySelector("#search-button");
    const playlist = document.getElementById('playlist');

    let currentAlbum = albums[0];
    
   


    albumElements.forEach((albumElement, index) => {
      albumElement.addEventListener("click", () => {
        currentAlbum = albums[index];
        songTitle.innerHTML = currentAlbum.songs[0].title;
        player.src = currentAlbum.songs[0].src;
        player.play();

      });

    });

    // player.addEventListener("timeupdate", () => {
    //   waveform.style.width = `${(player.currentTime / player.duration) * 100}%`;
    // });

    // waveform.addEventListener("timeupdate", () => {
    //   waveform.style.width = `${(waveform.currentTime / waveform.duration) * 100}%`;
    // });


    searchButton.addEventListener("click", () => {
      const searchedAlbum = albums.find(album => album.title.toLowerCase().includes(searchInput.value.toLowerCase()));
      if (searchedAlbum) {
        currentAlbum = searchedAlbum;
        songTitle.innerHTML = currentAlbum.songs[0].title;
        player.src = currentAlbum.songs[0].src;
        player.play();
      }
    });


    // function playSong(src) {
    //   document.getElementById('music-player').src = src;
    //   document.getElementById('music-player').play();
    // }



    function displayPlaylist(index) {
      const allPlaylists = document.getElementById('playlist').children;
      for (let i = 0; i < allPlaylists.length; i++) {
        allPlaylists[i].style.display = 'none';
      }
      const selectedPlaylist = document.getElementById(`playlist-${index}`);
      if (selectedPlaylist) {
        selectedPlaylist.style.display = 'block';
      }
    }
    
    



  });
  async function displayAlbums() {
    const response = await fetch('albums.json');
    const albums = await response.json();
  
    const playlistContainer = document.getElementById('playlist');
    albums.forEach((album, index) => {
      const playlist = document.createElement('div');
      playlist.classList.add('playlist');
      playlist.id = `playlist-${index}`;
      playlist.style.display = 'none';
  
      playlist.innerHTML = `
        <h3>${album.title}</h3>
        <ol class="ol-playlist">
          ${album.songs.map(song => `<li class="playsong-li"><a class="playsong" href="#">${song.title}</a> <a class="playsong-artist" href="#">${album.artist}</a></li>`)}
        </ol>
      `;
  
      playlistContainer.appendChild(playlist);
    });
  
    const albumsContainer = document.getElementById('albums');
    albums.forEach((album, index) => {
      const albumEl = document.createElement('div');
      albumEl.classList.add('album');
  
      albumEl.innerHTML = `
        <div class="album-cover">
          <img src="${album.cover}" alt="${album.title}">
        </div>
        <div class="album-info">
          <h2 class="album-title">${album.title}</h2>
          <p class="album-artist">${album.artist}</p>
        </div>
      `;
  
      albumEl.addEventListener('click', () => {
        displayPlaylist(index);
      });
  
      albumsContainer.appendChild(albumEl);
    });
  }
  


  
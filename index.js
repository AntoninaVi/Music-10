
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
    // const playlist = document.querySelector('.player-container');


    let currentAlbum = albums[0];
    async function displayAlbums() {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      const albums = await response.json();

      const albumsContainer = document.getElementById('albums-container');
      if (!albumsContainer) {
        console.error('Could not find the albums container element');
        return;
      }

      let html = '';
      albums.forEach((album, index) => {
        html += `
          <div class="album" onclick="displayPlaylist(${index})">
            <p>${album.title}</p>
          </div>
        `;
      });

      albumsContainer.innerHTML = html;
    }







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


    albums.forEach((album, index) => {
      const playlist = document.createElement('div');
      playlist.classList.add('playlist');
      playlist.id = `playlist-${index}`;
      playlist.innerHTML = `
    <h3>${album.title}</h3>
    <ol class="ol-playlist">
    ${album.songs.map(song => `<li class="playsong-li"><a class="playsong" href="#" onclick="playSong('${song.src}')">${song.title}</a> <a class="playsong-artist" href="#">${album.artist}</a></li>`)}
      </ol>`;

      playlist.querySelectorAll('.playsong').forEach((playSongElement, songIndex) => {
        playSongElement.addEventListener('click', (event) => {
          event.preventDefault();
          document.getElementById('music-player').src = album.songs[songIndex].src;
          document.getElementById('music-player').play();
        });
      });
      document.getElementById('playlist').appendChild(playlist);
    });


    function displayPlaylist(index) {
      const allPlaylists = document.getElementById('playList');
      for (let i = 0; i < allPlaylists.length; i++) {
        allPlaylists[i].style.display = 'none';
      }
      const selectedPlaylist = document.getElementById(`playList-${index}`);
      if (selectedPlaylist) {
        selectedPlaylist.style.display = 'block';
      }
  };




  });







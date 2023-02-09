


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





// console.log("Album: " + albums.title);
// console.log("Artist: " + albums.artist);
// for (var i = 0; i < albums.songs.length; i++) {
//   console.log((i + 1) + ". " + albums.songs[i].title + " - " + album.songs[i].length);
// }



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

    // playlist.innerHTML += `<li class"song-artist">${albums.title}</li>
    // `

    //   albums.map(album =>
    //     { return albums.songTitle
    // })
    //  console.log(playlist.innerHTML = `<li>${album.songs }</li>`)  
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





// ПОДХОДИТ НО НАДО ПЕРЕПИСАТЬ
// function displayPlaylist(albums) {
//   const playlist = document.createElement("div");
//   for (const album of albums) {
//     const albumName = document.createElement("h2");
//     albumName.innerText = album.albumName;
//     playlist.appendChild(albumName);

//     const songsList = document.createElement("ul");
//     for (const song of album.songs) {
//       const songItem = document.createElement("li");
//       songItem.innerText = `${song.title}`;
//       songsList.appendChild(songItem);
//     }
//     playlist.appendChild(songsList);
//   }
//   return playlist;
// }
// document.body.appendChild(displayPlaylist(albums));
// playlist

// function displayPlaylist(album) {
//   const playlist = document.getElementById("playlist");
//   playlist.style.display = "none";
//   const albumName = document.getElementsByClassName("album-title__artist");
//   albumName.innerText = album.albumName;
//   playlist.appendChild(albumName);

//   const songsList = document.createElement("ul");
//   for (const song of album.songs) {
//     const songItem = document.createElement("li");
//     songItem.innerText = `${song.title} (${song.duration})`;
//     songsList.appendChild(songItem);
//   }
//   playlist.appendChild(songsList);
//   return playlist;
// }


// function togglePlaylist(event) {
//   const playlist = event.target.nextElementSibling;
//   if (playlist.style.display === "none") {
//     playlist.style.display = "block";
//   } else {
//     playlist.style.display = "none";
//   }
// }


// for (const album of albums) {
//   const albumTitle =  document.getElementsByClassName("album-title");
//   albumTitle.innerText = album.albumName;
//   album.addEventListener("click", togglePlaylist);
//   main.appendChild(albumTitle);
//   main.appendChild(displayPlaylist(album));
// }

// document.body.appendChild(albums);


function displayPlaylist(album) {
  const playlist = document.createElement("div");
  playlist.style.display = "none";

  const albumName = document.createElement("h2");
  albumName.innerText = album.albumName;
  playlist.appendChild(albumName);

  const songsList = document.createElement("ul");
  for (const song of album.songs) {
    const songItem = document.createElement("li");
    songItem.innerText = `${song.title} (${song.duration})`;
    songsList.appendChild(songItem);
    songItem.addEventListener("click", () => {
      const audio = new Audio(song.url);
      audio.play();
    });
  }
  playlist.appendChild(songsList);
  return playlist;
}

// function togglePlaylist(event) {
//   const playlist = event.target.nextElementSibling;
//   if (playlist.style.display === "none") {
//     playlist.style.display = "block";
//   } else {
//     playlist.style.display = "none";
//   }
// }

// const main = document.getElementById("playlist");
// for (const album of albums) {
//   const albumTitle = document.querySelectorAll("album-title");
//   albumTitle.innerText = album.albumName;
//   albumTitle.forEach((albumTitle) => albumTitle.addEventListener("click", togglePlaylist()));
//   // document.body.appendChild(playlist);
//   main.appendChild(displayPlaylist(playlist));

// }


// console.log("Album: " + album.title + " by " + album.artist);
// console.log("Songs:");
// for (var i = 0; i < album.songs.length; i++) {
//   var song = album.songs[i];
//   console.log("  " + (i + 1) + ". " + song.title + " (" + song.length + ")");
// }

function displayPlaylist(index) {
  document.querySelectorAll('.playlist').forEach(el => {
    el.style.display = 'none';
  });
  const playlist = document.getElementById(`playlist-${index}`);
  playlist.style.display = 'block';
}

albums.forEach((album, index) => {
  const playlist = document.createElement('div');
  playlist.classList.add('playlist');
  playlist.id = `playlist-${index}`;
  playlist.innerHTML = `
    <h3>${album.title}</h3>
    <ul>
      ${album.songs.map(song => `<li>${JSON.stringify(song.title)}</li>`).join('')}
    </ul>
  `;
  document.getElementById('playlist').appendChild(playlist);
});
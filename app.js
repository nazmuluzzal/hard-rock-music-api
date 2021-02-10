const searchBtn = document.getElementById("search-btn");
const songContainer = document.getElementById("song-container");
const lyricsDiv = document.getElementById("song-lyrics");

//Search button event
searchBtn.addEventListener("click", () => {
  const inputText = document.getElementById("serach-input-text").value;
  const url = `https://api.lyrics.ovh/suggest/${inputText}`;
  // load songs by searching from API
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displaySongLists(data.data);
    })

    .catch((err) => {
      alert("Please Enter a Valid Song Name");
    });
  lyricsDiv.innerText = "";
});

// async and await
/** 
searchBtn.addEventListener("click", async () => {
  const inputText = document.getElementById("serach-input-text").value;
  const url = `https://api.lyrics.ovh/suggest/${inputText}`;
  // load songs by searching from API
  const res = await fetch(url);
  const data = await res.json();
  displaySongLists(data.data);

  // .catch((err) => {
  //   alert("Please Enter a Valid Song Name");
  // });

  lyricsDiv.innerText = "";
});

*/

// displat song lists
const displaySongLists = (songs) => {
  const inputText = document.getElementById("serach-input-text").value;
  if (inputText === "") {
    alert("Please Enter a song name");
  } else {
    let songDiv = "";
    songContainer.innerHTML = "";
    songs.forEach((song) => {
      // template string to load html tags
      songDiv += `
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onclick="getSongLyrics('${song.artist.name}',
                '${song.title}')">Get Lyrics</button>
            </div>
        </div>
        `;
      songContainer.innerHTML = songDiv;
    });
  }
};

// get song lyrics from api by get lyrics button
const getSongLyrics = (artist, title) => {
  const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
  // load api
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySongLyrics(data.lyrics));
};

// async and await
/**
  const getSongLyrics = async (artist, title) => {
  const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
  // load api
  const res = await fetch(url);
  const data = await res.json();
  displaySongLyrics(data.lyrics);
}; 

*/

//
// diplay song lyrics
const displaySongLyrics = (lyrics) => {
  //const lyricsDiv = document.getElementById("song-lyrics");
  lyricsDiv.innerText = lyrics;
};

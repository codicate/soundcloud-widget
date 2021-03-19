import logo from './logo.svg';
import './App.css';
import SoundCloudAPI from './SCAPI';

const API_ID = 'cd9be64eeb32d1741c17cb39e41d254d';
SoundCloudAPI.init(API_ID);

const playlist = JSON.parse(localStorage.getItem('playlist')) || [];
playlist.forEach((trackURL) => {
  addToPlaylist(trackURL);
});

const searchbar = document.querySelector('.js-search');
const searchbarBtn = document.querySelector('.js-submit');

searchbar.onkeyup = (e) => {
  if (e.key === 'Enter') {
    pushToDOM(e.target.value);
  }
};

searchbarBtn.onclick = () => {
  pushToDOM(searchbar.value);
};

const searchResult = document.querySelector('.js-search-results');
const sideBar = document.querySelector('.js-playlist');
const cardTPL = document.querySelector('#tpl').querySelector('.card');

function pushToDOM(input) {
  searchResult.innerHTML = '';

  SoundCloudAPI.getTrack(input, (track) => {
    const newCard = cardTPL.cloneNode(true);

    const img = newCard.querySelector('img');
    const artworkURL = track.artwork_url?.replace(/large(?=.jpg)/i, 't500x500');
    artworkURL ? img.src = artworkURL : img.style = 'background-image: linear-gradient(135deg,#70929c,#846170);';

    const title = newCard.querySelector('.header').querySelector('a');
    title.innerText = track.title;
    title.href = track.permalink_url;

    newCard.querySelector('.js-button').onclick = () => {
      playlist.push(track.permalink_url);
      localStorage.setItem('playlist', JSON.stringify(playlist));
      addToPlaylist(track.permalink_url);
    };

    searchResult.append(newCard);
  });
}

function addToPlaylist(trackURL) {
  SoundCloudAPI.displayTrack(trackURL, (embed) => {
    const div = document.createElement('div');
    div.innerHTML = embed.html;
    sideBar.insertBefore(div, sideBar.firstChild);
  });
}

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;

import SC from 'soundcloud';

const SoundCloudAPI = {
  init(ID) {
    SC.initialize({
      client_id: ID
    });
  },

  getTracks(input, func) {
    SC.get('/tracks', {
      q: input
    }).then(
      data => func(data)
    );
  },

  displayTracks(trackURL, func) {
    SC.oEmbed(trackURL, {
      auto_play: true
    }).then(
      embed => func(embed)
    );
  }
};

export default SoundCloudAPI;
import SC from 'soundcloud';

const SoundCloudAPI = {
  init(ID) {
    SC.initialize({
      client_id: ID
    });
  },

  getTrack(input, func) {
    SC.get('/tracks', {
      q: input
    }).then(
      data => func(data)
    );
  },

  displayTrack(trackURL, func) {
    SC.oEmbed(trackURL, {
      auto_play: true
    }).then(
      embed => func(embed)
    );
  }
};

export default SoundCloudAPI;
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

  playTrack(trackId) {
    SC.stream('/tracks/' + trackId).then(
      (player) => player.play()
    );
  },
};

export default SoundCloudAPI;
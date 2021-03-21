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

  async getPlayer(trackId) {
    return await SC.stream('/tracks/' + trackId);
  },
};

export default SoundCloudAPI;
import SoundCloud from 'soundcloud';


SoundCloud.initialize({
  client_id: process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID
});

const SoundCloudAPI = {
  async getTracks(
    input: string,
    func: (data: any) => void
  ) {
    const data = await SoundCloud.get('/tracks', {
      q: input
    });
    func(data);
  },

  async getPlayer(trackId: number) {
    return await SoundCloud.stream('/tracks/' + trackId);
  },
};

export default SoundCloudAPI;
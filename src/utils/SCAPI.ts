// @ts-ignore
// import SC from 'soundcloud';
import Soundcloud from 'soundcloud';

const SoundCloudAPI = {
  init(ID: string) {
    Soundcloud.initialize({
      client_id: ID
    });
  },

  async getTracks(
    input: string,
    func: (data: any) => void
  ) {
    const data = await Soundcloud.get('/tracks', {
      q: input
    });
    func(data);
  },

  async getPlayer(trackId: number) {
    return await Soundcloud.stream('/tracks/' + trackId);
  },
};

export default SoundCloudAPI;
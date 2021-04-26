// @ts-ignore
import SC from 'soundcloud';

const SoundCloudAPI = {
  init(ID: string) {
    SC.initialize({
      client_id: ID
    });
  },

  async getTracks(
    input: string,
    func: (data: any) => void
  ) {
    const data = await SC.get('/tracks', {
      q: input
    })
    func(data);
  },

  async getPlayer(trackId: number) {
    return await SC.stream('/tracks/' + trackId);
  },
};

export default SoundCloudAPI;
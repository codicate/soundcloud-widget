import Soundcloud from 'soundcloud.ts';

const soundcloud = new Soundcloud();

export const search = async (input: string) =>
  await soundcloud.tracks.searchV2({
    q: input
  });

export const getPlayer = async (trackId: string) => {
  return await soundcloud.util.streamTrack;
};
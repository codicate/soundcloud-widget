import { useAppDispatch } from 'app/hooks';
import { Playlist } from 'app/playlistSlice';
import { changeTrack } from 'app/playerSlice';

import Track from 'views/Track';


function PlaylistPage({
  playlist
}: {
  playlist: Playlist;
}) {
  const dispatch = useAppDispatch();

  return (
    <div>
      <p>
        {playlist.name}
      </p>
      {
        playlist.tracks.map((track, index) => (
          <Track
            key={index}
            track={track}
            play={() => dispatch(changeTrack(index))}
          />
        ))
      }
    </div>
  );
}

export default PlaylistPage;

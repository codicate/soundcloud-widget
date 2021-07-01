import { useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectPlaylist } from 'app/playlistSlice';
import { changeTrack } from 'app/playerSlice';

import Track from 'views/Track';


function PlaylistPage() {
  const { playlistName } = useParams<{ playlistName: string; }>();
  const dispatch = useAppDispatch();
  const playlist = useAppSelector(selectPlaylist(playlistName));

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

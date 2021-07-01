import { useEffect } from 'react';
import { useParams } from 'react-router';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectTrack, searchForTracks } from 'app/trackSlice';

import TrackList from 'views/TrackList';
import SpinnerRect from 'components/SpinnerRect';
import MessageDisplay from 'components/MessageDisplay';
import { useState } from 'react';


function Searchpage() {
  const dispatch = useAppDispatch();
  const { input } = useParams<{ input: string; }>();
  const [isFetched, setIsFetched] = useState(false);
  const { searchStatus, tracks } = useAppSelector(selectTrack);

  useEffect(() => {
    dispatch(searchForTracks(input));
    setIsFetched(true);
  }, [dispatch, input]);

  return (
    <>
      {(isFetched) && (() => {
        switch (searchStatus) {
          case 'pending':
            return <SpinnerRect />;

          case 'fulfilled':
            return (tracks.length === 0)
              ? <MessageDisplay
                iconCode='sentiment_dissatisfied'
                message='No result'
              />
              : <TrackList />;

          case 'rejected':
            return <MessageDisplay
              severity='error'
              iconCode='error'
              message='Something went wrong'
            />;

          default:
            return;
        }
      })()}
    </>
  );
}

export default Searchpage;

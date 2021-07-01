import { useAppSelector } from 'app/hooks';
import { selectTrack } from 'app/trackSlice';

import SpinnerRect from 'components/SpinnerRect';
import MessageDisplay from 'components/MessageDisplay';

import TrackList from 'pages/TrackList';

function Searchpage() {
  const { searchStatus, tracks } = useAppSelector(selectTrack);

  return (
    <>
      {(() => {
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

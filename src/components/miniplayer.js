const imgPlaceholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export default function MiniPlayer(props) {
  return (
    <div id='miniplayer'>
      <img
        className='cover'
        alt={props.title + ' cover'}
        src={props.imgURL || imgPlaceholder}
      />
      <div id='overlay'>
        <div className='info'>
          <p className='title'>
            {props.title}
          </p>
          <p className='artist'>
            {props.artist}
          </p>
          <p className='timestamp'>
            {props.currentTime} / {props.totalTime}
          </p>
        </div>
        <div className='control'>
          <span
            id='previous'
            className='material-icons btn'
            onClick={() => props.skip(false)}
          >
            skip_previous
            </span>
          <span
            id='play'
            className='material-icons btn'
            onClick={() => props.onPause()}
          >
            {props.pause ? 'play_arrow' : 'pause'}
          </span>
          <span
            id='next'
            className='material-icons btn'
            onClick={() => props.skip(true)}
          >
            skip_next
            </span>
        </div>
      </div>
    </div>
  );
}

const imgPlaceholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export default function Card({info, ...props}) {
  return (
    <div
      className='track'
    >
      <img
        className='cover'
        alt={info.title + ' cover'}
        src={info.imgURL || imgPlaceholder}
      />
      <div className='info'>
        <p className='title'>
          {info.title}
        </p>
        <p className='artist'>
          {info.artist}
        </p>
      </div>
      <div className='control'>
        <span
          id='add'
          className='material-icons btn'
          onClick={props.play}
        >
          add_box
          </span>
      </div>
    </div>
  );
}

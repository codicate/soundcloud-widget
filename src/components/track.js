const imgPlaceholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export default function Card(props) {
  return (
    <div
      className='track'
    >
      <img
        className='cover'
        alt={props.title + ' cover'}
        src={props.imgURL || imgPlaceholder}
      />
      <div className='info'>
        <p className='title'>
          {props.title}
        </p>
        <p className='artist'>
          {props.artist}
        </p>
      </div>
      <div className='control'>
        <span
          id='add'
          className='material-icons btn'
          onClick={() => props.play()}
        >
          add_box
          </span>
      </div>
    </div>
  );
}

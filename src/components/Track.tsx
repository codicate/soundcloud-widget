import styles from 'components/Track.module.scss';

const imgPlaceholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export default function Card(
  { info, play }: {
    info: {
      title: string,
      artist: string,
      imgURL: string;
    },
    play: () => void;
  }
) {
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
          onClick={play}
        >
          add_box
        </span>
      </div>
    </div>
  );
}

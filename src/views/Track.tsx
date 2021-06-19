import styles from './Track.module.scss';

import { imgPlaceholder } from 'utils/constants';

import Button from 'components/Button'


function Track(
  { info, play }: {
    info: {
      title: string,
      artist: string,
      artworkURL: string;
    },
    play: () => void;
  }
) {
  return (
    <div
      className={styles.track}
    >
      <img
        className={styles.cover}
        alt={info.title + ' cover'}
        src={info.artworkURL || imgPlaceholder}
      />

      <div className={styles.info}>
        <p className={styles.title}>
          {info.title}
        </p>
        <p className={styles.artist}>
          {info.artist}
        </p>
      </div>

      <div className={styles.control}>
        <Button
          className='material-icons btn'
          onClick={play}
        >
          add_box
        </Button>
      </div>
    </div>
  );
}

export default Track;
import styles from './Notifier.module.scss';

import { useAppSelector } from 'app/hooks';
import { selectNotices } from 'app/noticeSlice';

const Notifier = () => {
  const notices = useAppSelector(selectNotices);

  return (
    <div id={styles.notifier}>
      {notices.map((notice, idx) => (
        <div key={idx}>
          {notice.msg}
        </div>
      ))}
    </div>
  );
};

export default Notifier;

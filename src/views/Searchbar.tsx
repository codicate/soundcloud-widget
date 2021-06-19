import styles from './Searchbar.module.scss';
import { useState, useRef } from 'react';

import { useAppDispatch } from 'app/hooks';
import { searchForTracks } from 'app/soundcloudSlice';

import Button from 'components/Button';


export default function Searchbar() {
  const dispatch = useAppDispatch();

  const [input, setInput] = useState('');
  const searchbar = useRef<null | HTMLInputElement>(null);

  return (
    <div id={styles.searchbar}>
      <input
        autoFocus
        placeholder='Search'
        ref={searchbar}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            dispatch(searchForTracks({
              input: (e.target as HTMLInputElement).value,
              limit: 20,
              pagination: true
            }));
          }
        }}
      />
      <div id={styles.clearDiv}>
        <Button
          className='material-icons'
          onClick={() => {
            setInput('');
            searchbar.current && searchbar.current.focus();
          }}
        >
          clear
        </Button>
      </div>
    </div>
  );
}
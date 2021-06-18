import styles from 'components/Searchbar.module.scss';
import { useState, useRef } from 'react';

import { useAppDispatch } from 'app/hooks';
import { searchForTracks } from 'app/soundcloudSlice';


export default function Searchbar() {
  const dispatch = useAppDispatch();

  const [input, setInput] = useState('');
  const searchbar = useRef<null | HTMLInputElement>(null);

  return (
    <div id='searchBar'>
      <input
        autoFocus
        placeholder='Search'
        ref={searchbar}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            dispatch(searchForTracks((e.target as HTMLInputElement).value));
          }
        }}
      />
      <div id='clearDiv'>
        <span
          id='clear'
          className='material-icons btn'
          onClick={() => {
            setInput('');
            searchbar.current && searchbar.current.focus();
          }}
        >
          clear
        </span>
      </div>
    </div>
  );
}
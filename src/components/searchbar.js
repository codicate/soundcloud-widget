import React, { useState, useRef } from 'react';

export default function Searchbar(props) {
  const [input, setInput] = useState('');
  const searchbar = useRef();

  return (
    <div id='searchBar'>
      <input
        autoFocus
        type='text'
        placeholder='Search'
        ref={searchbar}
        value={input}
        onChange={
          e => setInput(e.target.value)
        }
        onKeyUp={e => 
          e.key === 'Enter' && props.returnInput(e.target.value)
        }
      />
      <div id='clearDiv'>
        <span
          id='clear'
          className='material-icons btn'
          onClick={() => {
            setInput('');
            searchbar.current.focus();
          }}
        >
          clear
        </span>
      </div>
    </div>
  );
}
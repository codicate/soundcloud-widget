import React from 'react';

export default function Spinner() {
  const spinnerStyle = {
    margin: '100px auto',
    width: '50px',
    height: '40px',
    textAlign: 'center',
    fontSize: '10px',
  };

  const rectStyle = {
    backgroundColor: '#333',
    height: '100%',
    width: '6px',
    display: 'inline-block',

    animation: 'sk-stretchdelay 1.2s infinite ease-in-out'
  };

  return (
    <div class="spinner" style={spinnerStyle}>
      <div class="rect" style={rectStyle}></div>
      <div class="rect" style={rectStyle}></div>
      <div class="rect" style={rectStyle}></div>
      <div class="rect" style={rectStyle}></div>
      <div class="rect" style={rectStyle}></div>
    </div>
  );
}

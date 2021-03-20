import React from 'react';
import styled from 'styled-components';

const SpinnerDiv = styled.div`
  margin: auto;

  @keyframes sk-stretchdelay {
    0%, 40%, 100% { 
      transform: scaleY(0.4);
    }  20% { 
      transform: scaleY(1.0);
    }
  }
`;

const Rect = styled.div`
  display: inline-block;
  background-color: ${props => props.color || 'white'};
  height: ${props => props.height || 50}px;
  width: ${props => props.width || 6}px;
  margin: 0 ${props => props.width / 3 || 2}px;

  animation: sk-stretchdelay ${props => 0.7 + props.num / 10}s infinite ease-in-out;
  animation-delay: -${props => 1.1 - props.index / 10}s;
`;

export default function Spinner(props) {
  const numOfRect = props.num || 5;

  return (
    <SpinnerDiv>
      {[...Array(numOfRect)].map((_, index) => (
        <Rect
          key={index}
          index={index}
          num={numOfRect}
          color={props.color}
          height={props.height}
          width={props.width}
        />
      ))}
    </SpinnerDiv>
  );
}

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

const Rect = styled.div<{
  num: number,
  color: string,
  height: number,
  width: number,
  index: number;
}>`
  display: inline-block;
  background-color: ${props => props.color};
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  margin: 0 ${props => props.width / 3}px;

  animation: sk-stretchdelay ${props => 0.7 + props.num / 10}s infinite ease-in-out;
  animation-delay: -${props => 1.1 - props.index / 10}s;
`;

export default function Spinner(
  {
    num = 5,
    height = 50,
    width = 6,
    color = 'white'
  }: {
    num?: number,
    color?: string,
    height?: number,
    width?: number;
  }
) {

  return (
    <SpinnerDiv>
      {[...Array(num)].map((_, index) => (
        <Rect
          key={index}
          index={index}
          num={num}
          color={color}
          height={height}
          width={width}
        />
      ))}
    </SpinnerDiv>
  );
}

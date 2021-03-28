import { useCallback, useEffect, useRef } from 'react';
import useEventListener from './useEventListener';
import getRefCurrent from '../functions/getRefCurrent';
import clamp from '../functions/clamp';

const useDrag = (
  eventTarget,
  movingTarget = eventTarget,

) => {

  const dragable = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const edge = useRef({ x: 0, y: 0 });

  const getDist2Edge = useCallback(() => {
    const movingElement = getRefCurrent(movingTarget);

    return {
      x: window.innerWidth - movingElement.offsetWidth,
      y: window.innerHeight - movingElement.offsetHeight,
    };
  }, [movingTarget]);

  useEffect(() => {
    edge.current = getDist2Edge();
  }, [getDist2Edge]);

  useEventListener(window, 'resize', () => {
    edge.current = getDist2Edge();
    setPos();
  });

  useEventListener(eventTarget, 'mousedown', (e) => {
    const movingElement = getRefCurrent(movingTarget);
    dragable.current = true;

    pos.current = {
      x: e.clientX,
      y: e.clientY
    };

    offset.current = {
      x: movingElement.offsetLeft - pos.current.x,
      y: movingElement.offsetTop - pos.current.y
    };

  }, true);

  useEventListener(document, 'mouseup', () => {
    dragable.current = false;
  }, true);

  useEventListener(document, 'mousemove', (e) => {
    e.preventDefault();
    if (dragable.current) setPos(e);
  }, true);

  const setPos = (e) => {
    const movingElement = getRefCurrent(movingTarget);

    pos.current = {
      x: clamp(e?.clientX || pos.current.x, 0, edge.current.x - offset.current.x),
      y: clamp(e?.clientY || pos.current.y, 0, edge.current.y - offset.current.y)
    };

    movingElement.style.left = clamp(pos.current.x + offset.current.x, 0, edge.current.x) + 'px';
    movingElement.style.top = clamp(pos.current.y + offset.current.y, 0, edge.current.y) + 'px';
  };
};

export default useDrag;
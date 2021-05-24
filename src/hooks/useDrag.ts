import { useCallback, useEffect, useRef } from 'react';
import useEventListener from 'hooks/useEventListener';

import clamp from 'functions/clamp';

const useDrag = <E extends HTMLElement | Document | Window>(
  eventElement: E,
  movingElement: HTMLElement = eventElement as HTMLElement,

) => {
  const dragable = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const edge = useRef({ x: 0, y: 0 });

  const getDist2Edge = useCallback(() => {
    return {
      x: window.innerWidth - movingElement.offsetWidth,
      y: window.innerHeight - movingElement.offsetHeight,
    };
  }, [movingElement]);

  useEffect(() => {
    edge.current = getDist2Edge();
  }, [getDist2Edge]);

  useEventListener(window, 'resize', () => {
    edge.current = getDist2Edge();
    setPos();
  });

  useEventListener(eventElement, 'mousedown', (e) => {
    dragable.current = true;

    pos.current = {
      x: e.clientX,
      y: e.clientY
    };

    offset.current = {
      x: pos.current.x - movingElement.offsetLeft,
      y: pos.current.y - movingElement.offsetTop
    };
  }, true);

  useEventListener(document, 'mouseup', () => {
    dragable.current = false;
  }, true);

  useEventListener(document, 'mousemove', (e) => {
    e.preventDefault();
    if (dragable.current) setPos(e);
  }, true);

  const setPos = (e?: MouseEvent) => {
    pos.current = {
      x: clamp((e?.clientX || pos.current.x + offset.current.x) - offset.current.x, 0, edge.current.x),
      y: clamp((e?.clientY || pos.current.y + offset.current.y) - offset.current.y, 0, edge.current.y)
    };

    movingElement.style.left = pos.current.x + 'px';
    movingElement.style.top = pos.current.y + 'px';
  };
};

export default useDrag;
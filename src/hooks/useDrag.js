import { useRef } from 'react';
import getRefCurrent from '../functions/getRefCurrent';
import useEventListener from './useEventListener';

const useDrag = (
  eventTarget,
  movingTarget = eventTarget,
  scale = { current: 1 }

) => {
  const movingElement = getRefCurrent(movingTarget);

  const dragable = useRef(false);
  let offset = useRef({ x: 0, y: 0 });
  let pos = useRef({ x: 0, y: 0 });

  useEventListener(eventTarget, 'mousedown', (e) => {

    dragable.current = true;

    pos.current = {
      x: e.clientX / scale.current,
      y: e.clientY / scale.current
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

    if (dragable.current) {
      pos.current = {
        x: e.clientX / scale.current,
        y: e.clientY / scale.current
      };

      movingElement.style.left = pos.current.x + offset.current.x + 'px';
      movingElement.style.top = pos.current.y + offset.current.y + 'px';
    }

  }, true);
};

export default useDrag;
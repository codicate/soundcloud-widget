import getRefCurrent from '../functions/getRefCurrent';
import useEventListener from './useEventListener';

const useDrag = (
  eventTarget,
  movingTarget = eventTarget,
  scale = { current: 1 }

) => {

  console.log('drag added')

  let dragable = false;
  let offset = { x: 0, y: 0 };
  let pos = { x: 0, y: 0 };

  useEventListener(eventTarget, 'mousedown', (e) => {
    const movingElement = getRefCurrent(movingTarget);
    dragable = true;

    pos = { x: e.clientX / scale.current, y: e.clientY / scale.current };
    offset.x = movingElement.offsetLeft - pos.x;
    offset.y = movingElement.offsetTop - pos.y;
  }, true);

  useEventListener(document, 'mouseup', () => {
    dragable = false;
  }, true);

  useEventListener(document, 'mousemove', (e) => {
    e.preventDefault();
    dragable && setPos(e);
  }, true);

  const setPos = (e) => {
    const movingElement = getRefCurrent(movingTarget);

    pos = { x: e.clientX / scale.current, y: e.clientY / scale.current };

    movingElement.style.left = pos.x + offset.x + 'px';
    movingElement.style.top = pos.y + offset.y + 'px';
  };
};

export default useDrag;
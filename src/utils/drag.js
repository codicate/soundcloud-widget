const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const addDrag = (targetElement, movingElement = targetElement) => {
  let dragable = false;
  let offset = { x: 0, y: 0 };
  let pos = { x: 0, y: 0 };

  const getDist2Edge = () => ({
    x: window.innerWidth - movingElement.offsetWidth,
    y: window.innerHeight - movingElement.offsetHeight,
  });

  let edge = getDist2Edge();
  window.onresize = () => {
    edge = getDist2Edge();
    setPos();
  };

  targetElement.addEventListener('mousedown', (e) => {
    dragable = true;

    pos = { x: e.clientX, y: e.clientY };
    offset.x = movingElement.offsetLeft - pos.x;
    offset.y = movingElement.offsetTop - pos.y;
  }, true);

  document.addEventListener('mouseup', () => {
    dragable = false;
  }, true);

  document.addEventListener('mousemove', (e) => {
    e.preventDefault();
    if (dragable) {
      setPos(e);
    }
  }, true);

  const setPos = (e) => {
    pos = {
      x: clamp(e?.clientX || pos.x, 0, edge.x - offset.x),
      y: clamp(e?.clientY || pos.y, 0, edge.y - offset.y)
    };

    const coordinate = {
      x: clamp(pos.x + offset.x, 0, edge.x) + 'px',
      y: clamp(pos.y + offset.y, 0, edge.y) + 'px'
    };

    movingElement.style.left = coordinate.x;
    movingElement.style.top = coordinate.y;
  };

  return () => {

  };
};

export default addDrag;
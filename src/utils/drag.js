const drag = (targetElement, movingElement = targetElement) => {
  let dragable = false;
  let offset = { x: 0, y: 0 };
  let pos = { x: 0, y: 0 };

  targetElement.addEventListener('mousedown', (e) => {
    dragable = true;
    console.log('mousedown');

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

      pos = { x: e.clientX, y: e.clientY };

      const coordinate = { x: pos.x + offset.x + 'px', y: pos.y + offset.y + 'px' };
      movingElement.style.left = coordinate.x;
      movingElement.style.top = coordinate.y;
    }
  }, true);
};

export default drag;
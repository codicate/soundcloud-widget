import React, { useCallback, useEffect, useRef } from 'react';

import useEventListener from 'hooks/useEventListener';
import { clamp } from 'utils/functions';


function Draggie({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const draggie = useRef<HTMLDivElement>(null);
  const dragable = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const edge = useRef({ x: 0, y: 0 });

  const getDist2Edge = useCallback(() => ({
    x: document.body.clientWidth - (draggie.current?.offsetWidth || 0),
    y: document.body.clientHeight - (draggie.current?.offsetHeight || 0),
  }), []);

  const setPos = useCallback((e?: MouseEvent) => {
    pos.current = {
      x: clamp((e?.clientX || pos.current.x + offset.current.x) - offset.current.x, 0, edge.current.x),
      y: clamp((e?.clientY || pos.current.y + offset.current.y) - offset.current.y, 0, edge.current.y)
    };

    if (draggie.current) {
      draggie.current.style.left = pos.current.x + 'px';
      draggie.current.style.top = pos.current.y + 'px';
    }
  }, []);

  useEffect(() => {
    edge.current = getDist2Edge();
    pos.current = {
      x: draggie.current?.offsetLeft || 0,
      y: draggie.current?.offsetTop || 0
    };
  }, [getDist2Edge]);

  useEventListener(window, 'resize', () => {
    edge.current = getDist2Edge();
    setPos();
  });

  useEventListener(document, 'mouseup', () => {
    dragable.current = false;
  }, true);

  useEventListener(document, 'mousemove', (e) => {
    e.preventDefault();
    dragable.current && setPos(e);
  }, true);

  return (
    <div
      {...props}
      style={{ position: 'fixed' }}
      ref={draggie}
      onMouseDown={(e) => {
        dragable.current = true;

        pos.current = {
          x: e.clientX,
          y: e.clientY
        };

        offset.current = {
          x: pos.current.x - (draggie.current?.offsetLeft || 0),
          y: pos.current.y - (draggie.current?.offsetTop || 0)
        };
      }}
    >
      {children}
    </div>
  );
}

export default Draggie;

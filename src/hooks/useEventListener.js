import { useEffect, useRef } from 'react';
import getRefCurrent from 'functions/getRefCurrent';

const useEventListener = (eventTarget, eventType, handler, options = {}) => {
  const savedHandler = useRef(null);
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = getRefCurrent(eventTarget);
    if (!element || !element.addEventListener) return;

    const listener = (event) => savedHandler.current(event);
    element.addEventListener(eventType, listener, options);

    return () => element.removeEventListener(eventType, listener, options);
  }, [eventTarget, eventType, options]);
};

export default useEventListener;
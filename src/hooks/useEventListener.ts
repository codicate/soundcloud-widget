import { useEffect, useRef } from 'react';

import getRefCurrent from 'functions/getRefCurrent';

const useEventListener = <
  E extends HTMLElement | Document | Window,
  T extends keyof HTMLElementEventMap | keyof DocumentEventMap | keyof WindowEventMap,
  >(
    eventTarget: React.MutableRefObject<HTMLElement> | E,
    eventType: T | string,
    listener: (
      e:
        T extends keyof HTMLElementEventMap ? HTMLElementEventMap[T]
        : T extends keyof DocumentEventMap ? DocumentEventMap[T]
        : T extends keyof WindowEventMap ? WindowEventMap[T]
        : Event
    ) => void,
    options?: boolean | AddEventListenerOptions

  ) => {

  const savedListener = useRef(listener);
  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  useEffect(() => {
    const element = getRefCurrent(eventTarget);
    if (!element || !element.addEventListener) return;

    const wrappedListener: typeof savedListener.current = (e) => savedListener.current(e);
    element.addEventListener(eventType, wrappedListener as EventListener, options);

    return () => element.removeEventListener(eventType, wrappedListener as EventListener, options);
  }, [eventTarget, eventType, options]);
};

export default useEventListener;
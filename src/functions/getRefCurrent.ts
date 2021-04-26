const getRefCurrent = <T>(ref: React.MutableRefObject<HTMLElement> | T) => {
  return ((ref as React.MutableRefObject<HTMLElement>).current)
    ? (ref as React.MutableRefObject<HTMLElement>).current
    : ref as T;
};

export default getRefCurrent;
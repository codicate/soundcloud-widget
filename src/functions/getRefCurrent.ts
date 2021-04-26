const getRefCurrent = <T>(ref: React.MutableRefObject<T> | T) => {
  return ((ref as React.MutableRefObject<T>).current)
    ? (ref as React.MutableRefObject<T>).current
    : ref as T;
};

export default getRefCurrent;
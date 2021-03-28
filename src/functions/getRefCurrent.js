const getRefCurrent = (ref) => {
  return ref.hasOwnProperty("current")
    ? ref.current
    : ref;
};

export default getRefCurrent;
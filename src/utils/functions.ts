export const clamp = (
  num: number,
  min: number,
  max: number
) =>
  Math.min(Math.max(num, min), max);

export const getRandNumBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const millisecond2second = (milliseconds: number) => {
  return Math.floor(milliseconds / 1000);
};

export const displayTime = (seconds: number) => {
  return [seconds % 3600 / 60, seconds % 60]
    .map((val: number) =>
      `0${Math.floor(val)}`.slice(-2)
    )
    .join(':');
};
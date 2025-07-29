export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

export const timeStringToSeconds = (str) => {
  const [min, sec] = str.split(":").map(Number);
  return min * 60 + sec;
};

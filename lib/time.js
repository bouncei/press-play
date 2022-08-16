export const millisToMinutesAndSeconds = (mills) => {
  const minutes = Math.floor(mills / 60000);
  const seconds = ((mills % 60000) / 1000).toFixed(0);

  return seconds === 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export function makeId(length = 5) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const timeToShow = (time) => {
  let min = Math.round(Math.floor(time / 60));
  if (min.toString().length < 2) min = `0${min}`;
  let sec = Math.round(time - Math.floor(time / 60) * 60);
  if (sec.toString().length < 2) sec = `0${sec}`;
  return isNaN(min) || isNaN(sec) ? '00:00' : `${min}:${sec}`;
};

export const debounce = (cl, timeout = 300) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cl.apply(null, args);
    }, timeout);
  };
};

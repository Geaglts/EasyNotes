export const isEmpty = (str = '') => {
  return str.length === 0;
};

export const isEquals = (original, toCheck) => {
  return original === toCheck;
};

export const isNotEquals = (original, toCheck) => {
  return original !== toCheck;
};

export const isUrl = (str = '') => {
  const urlRegex = /^(https:\/\/)?[a-z|.]+\.[a-z|.]{1}[\/[a-z|-|?|=|&]+]?/;
  return str.match(urlRegex);
};

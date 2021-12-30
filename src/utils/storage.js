export const STORAGE = {
  TEMP_EMAIL: 'TEMPORAL_EMAIL',
};

function storage(param, type = 'session') {
  const storageDestination = type === 'session' ? sessionStorage : localStorage;
  return {
    value() {
      const parsedValue = JSON.parse(storageDestination.getItem(param));
      return parsedValue;
    },
    set(value) {
      const stringValue = JSON.stringify(value);
      storageDestination.setItem(param, stringValue);
    },
    remove() {
      storageDestination.removeItem(param);
    },
  };
}

export default storage;

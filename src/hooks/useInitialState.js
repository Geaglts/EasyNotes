import { useState, useEffect } from 'react';
import { darkThemeStorage, userStorage } from 'storage';

const initialState = {
  darkTheme: false,
  hasUser: false,
};

function useInitialState() {
  const [state, setState] = useState(initialState);

  const loadState = () => {
    setState({ darkTheme: darkThemeStorage.get(), hasUser: userStorage.get() });
  };

  useEffect(() => {
    loadState();
    return () => {};
  }, []);

  const changeTheme = () => {
    setState({ ...state, darkTheme: !state.darkTheme });
    darkThemeStorage.set(String(!state.darkTheme));
  };

  const changeUserStatus = () => {
    setHasUser(!hasUser);
  };

  return { ...state, changeTheme, changeUserStatus };
}

export default useInitialState;

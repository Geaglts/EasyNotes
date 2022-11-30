import { useState, useEffect } from 'react';
import { darkThemeStorage, userStorage } from '@storage';

const initialState = {
  darkTheme: true,
  hasUser: false,
  token: null,
};

function useInitialState() {
  const [state, setState] = useState(initialState);

  const loadState = () => {
    const themeIsOnStorage = darkThemeStorage.isOnStorage();
    if (!themeIsOnStorage) {
      darkThemeStorage.set(state.darkTheme);
    }
    setState({ darkTheme: darkThemeStorage.get(), hasUser: userStorage.get() });
  };

  useEffect(() => {
    loadState();
  }, []);

  const changeTheme = () => {
    setState({ ...state, darkTheme: !state.darkTheme });
    darkThemeStorage.set(String(!state.darkTheme));
  };

  const changeUserStatus = (token) => {
    userStorage.set(!state.hasUser, token);
    setState({ ...state, hasUser: !state.hasUser, token });
  };

  const logout = async () => {
    await userStorage.removeSession();
    setState({ ...state, hasUser: null, token: null });
  };

  const theme = state.darkTheme ? 'dark' : 'light';

  return { ...state, changeTheme, changeUserStatus, theme, logout };
}

export default useInitialState;

import axios from 'axios';
import { useState, useEffect } from 'react';

import { userStorage } from 'storage';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(null);

  useEffect(() => {
    const token = userStorage.getToken();
    const isLogged = Boolean(token);
    if (token) {
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    }
    setIsLogged(isLogged);
    setIsLoading(false);
  }, []);

  return { isLoading, isLogged };
};

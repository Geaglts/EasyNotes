import axios from 'axios';
import { useState, useEffect } from 'react';

import { userStorage } from '@storage';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(null);

  const verifyToken = async () => {
    const token = userStorage.getToken();
    if (token) {
      const { data } = await axios.get(
        `/api/v1/utils/validate-token?token=${token}`,
        { headers: { apikey: process.env.API_KEY } }
      );
      if (data.isValid) {
        axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    } else {
      setIsLogged(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    verifyToken();
    return () => {};
  }, []);

  return { isLoading, isLogged };
};

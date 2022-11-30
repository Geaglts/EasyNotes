import axios from 'axios';
import { useState, useEffect, useContext } from 'react';

import { Context } from '@context';
import { userStorage } from '@storage';

export const useAuth = () => {
  const { logout } = useContext(Context);
  const [isLogged, setIsLogged] = useState();

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
        return true;
      } else {
        setIsLogged(false);
        await logout();
        return false;
      }
    }
    setIsLogged(false);
    return false;
  };

  return { isLogged, verifyToken };
};

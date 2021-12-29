import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Axios from 'axios';

const ActivateAccount = () => {
  const [params] = useSearchParams();

  const activateAccount = async () => {
    const URL = `${process.env.API_URL}/auth/activate`;
    const token = params.get('token');
    console.log(URL, token);
    const { data } = await Axios.post(URL, { token });
    console.log(data);
  };

  useEffect(() => {
    activateAccount();
  }, []);

  return <div>Token: {params.get('token')}</div>;
};

export default ActivateAccount;

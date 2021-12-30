import React, { useEffect, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import Axios from 'axios';

import TokenExpired from '@fragments/ActivateAccount/TokenExpired';

const ActivateAccount = () => {
  const [params] = useSearchParams();
  const [errorCode, setErrorCode] = useState(null);

  const activateAccount = async () => {
    const URL = `${process.env.API_URL}/auth/activate`;
    const token = params.get('token');
    const { data } = await Axios.post(URL, { token });
    if (data.errorCode) {
      setErrorCode(data.errorCode);
    }
  };

  useEffect(() => {
    activateAccount();
    return () => {};
  }, []);

  if (errorCode) {
    switch (errorCode) {
      case 3:
        return <TokenExpired />;
      case 4:
        return <Navigate to="/" />;
      default:
        return <p>🚜 No entiendo que paso</p>;
    }
  }

  return <div>Token: {params.get('token')}</div>;
};

export default ActivateAccount;

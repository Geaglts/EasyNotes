import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, Navigate, Link } from 'react-router-dom';
import Axios from 'axios';
import { BsCheckCircle } from 'react-icons/bs';
import { BiLogInCircle } from 'react-icons/bi';

import TokenExpired from '@fragments/ActivateAccount/TokenExpired';

import 'styles/pages/ActivateAccount.scss';

import { Context } from 'context';

const ActivateAccount = () => {
  const { theme } = useContext(Context);
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
        return <p>🚜</p>;
    }
  }

  return (
    <div className={`ActivateAccount ${theme}`}>
      <div className="ActivateAccount__Content">
        <BsCheckCircle className="ActivateAccount__Icon" />
        <p className="ActivateAccount__Info">Bienvenida, Bienvenide, Bienvenido ✨</p>
        <Link to="/login" className="ActivateAccount__LinkToLogin">
          Iniciar Sesión <BiLogInCircle />
        </Link>
      </div>
    </div>
  );
};

export default ActivateAccount;

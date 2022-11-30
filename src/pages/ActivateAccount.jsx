import { useEffect, useState, useContext } from 'react';
import { useSearchParams, Navigate, Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { BsCheckCircle } from 'react-icons/bs';
import { BiLogInCircle } from 'react-icons/bi';
import { Helmet } from 'react-helmet';

import TokenExpired from '@fragments/ActivateAccount/TokenExpired';
import { APP_NAME } from '@constants';

import { Context } from '@context';

import '@styles/pages/ActivateAccount.scss';

const ActivateAccount = () => {
  const navigate = useNavigate();
  const { theme } = useContext(Context);
  const [params] = useSearchParams();
  const [errorCode, setErrorCode] = useState(null);
  const [loading, setLoading] = useState(true);

  const activateAccount = async () => {
    try {
      setErrorCode(null);
      const URL = `${process.env.API_URL}/auth/activate`;
      const token = params.get('token');
      if (!token) return navigate('/');
      const { data } = await Axios.post(URL, { token });
      setLoading(false);
      if (data.errorCode) {
        setErrorCode(data.errorCode);
      }
    } catch {
      navigate('/');
    }
  };

  useEffect(() => {
    activateAccount();
    return () => {};
  }, []);

  if (errorCode) {
    switch (errorCode) {
      case 4:
        return <TokenExpired />;
      case 5:
        return <Navigate to="/" />;
      default:
        return <Navigate to="/" />;
    }
  }

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <>
      <Helmet>
        <title>{APP_NAME} | Cuenta activada correctamente</title>
      </Helmet>
      <div className={`ActivateAccount ${theme}`}>
        <div className="ActivateAccount__Content">
          <BsCheckCircle className="ActivateAccount__Icon" />
          <p className="ActivateAccount__Info">
            Bienvenida, Bienvenide, Bienvenido ✨
          </p>
          <Link to="/login" className="ActivateAccount__LinkToLogin">
            Iniciar Sesión <BiLogInCircle />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ActivateAccount;

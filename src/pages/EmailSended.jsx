import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import Axios from 'axios';
import { Helmet } from 'react-helmet';

import { Context } from '../Context';

import { APP_NAME } from '@constants';
import storage, { STORAGE } from 'utils/storage';
import Toast from 'components/Toast';
import useFormError from 'hooks/useFormError';

import '@styles/pages/EmailSended.scss';

const EmailSended = () => {
  const navigate = useNavigate();
  const { darkTheme } = useContext(Context);
  const { formErrors, addErrors } = useFormError();

  const themeClass = darkTheme ? ' dark' : '';

  const handleResendEmail = async () => {
    const URL = `${process.env.API_URL}/auth/resend-activation-email`;
    const email = storage(STORAGE.TEMP_EMAIL).value();
    const { data } = await Axios.post(URL, { email });
    if (data.statusCode) {
      navigate('/');
    }
    storage(STORAGE.TEMP_EMAIL).remove();
    addErrors([{ message: 'Te hemos enviado el correo nuevamente 🌞', type: 'success' }]);
  };

  return (
    <>
      <Helmet>
        <title>{APP_NAME} | Correo de confirmación</title>
      </Helmet>
      <div className={`EmailSended${themeClass}`}>
        <MdEmail className="EmailSended__Icon" />
        <p className="EmailSended__DescriptionLabel">Te hemos enviado un correo de confirmación, por favor revisa tu bandeja de entrada.</p>
        <Link className="EmailSended__Link" to="/">
          Ir al inicio
        </Link>
        <div className="EmailSended__Resend">
          <p className="EmailSended__ResendLabel">¿No recibiste el correo?</p>
          <button className="EmailSended__ResendButton" onClick={handleResendEmail}>
            Reenvíame el correo
          </button>
        </div>
        <Toast messages={formErrors} />
      </div>
    </>
  );
};

export default EmailSended;

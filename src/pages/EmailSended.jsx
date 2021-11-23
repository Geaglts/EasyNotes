import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdMarkEmailUnread } from 'react-icons/md';
import 'styles/pages/EmailSended.scss';

import { Context } from '../Context';

const EmailSended = () => {
  const { darkTheme } = useContext(Context);

  const themeClass = darkTheme ? ' dark' : '';

  const handleResendEmail = () => {
    console.log('we just sent the email again');
  };

  return (
    <div className={`EmailSended${themeClass}`}>
      <MdMarkEmailUnread className="EmailSended__Icon" />
      <p className="EmailSended__DescriptionLabel">Te hemos enviado un correo de confirmación.</p>
      <Link className="EmailSended__Link" to="/">
        Ir al inicio
      </Link>
      <div className="EmailSended__Resend">
        <p className="EmailSended__ResendLabel">¿No recibiste el correo?</p>
        <button className="EmailSended__ResendButton" onClick={handleResendEmail}>
          Reenvíame el correo
        </button>
      </div>
    </div>
  );
};

export default EmailSended;

import React from 'react';
import '@styles/Components/Toast.scss';

export const TOAST_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  DANGER: 'danger',
  SUCCESS: 'success',
};

const Toast = ({ messages }) => {
  return (
    <div className="Toast">
      {messages.map(({ message, type }, key) => (
        <p key={key} className={`Toast-Message${` ${type}`}`}>
          {message}
        </p>
      ))}
    </div>
  );
};

Toast.defaultProps = {
  messages: [],
};

export default Toast;

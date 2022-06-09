import React from 'react';
import '@styles/Components/Toast.scss';

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

export default Toast;

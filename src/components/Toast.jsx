import React, { useState, useEffect } from 'react';
import 'styles/Components/Toast.scss';

const Toast = ({ messages }) => {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    setMessageList(messages);
    const timeoutId = setTimeout(() => {
      setMessageList([]);
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [messages]);

  return (
    <div className="Toast">
      {messageList.map(({ message, type }, key) => (
        <p key={key} className={`Toast-Message${` ${type}`}`}>
          {message}
        </p>
      ))}
    </div>
  );
};

export default Toast;

import React, { useContext } from 'react';
import { Context } from '../Context';
import '../styles/Components/Message.scss';

function Message(props) {
  const { darkTheme } = useContext(Context);
  return (
    <p className={`Message ${darkTheme ? 'MessageDark' : ''}`}>
      {props.textMessage}
    </p>
  );
}

export { Message };

import { useContext } from 'react';
import { Context } from '../Context';
import '../styles/Components/Message.scss';

function Message({ textMessage }) {
  const { darkTheme } = useContext(Context);
  return (
    <p className={`Message ${darkTheme ? 'MessageDark' : ''}`}>{textMessage}</p>
  );
}

export { Message };

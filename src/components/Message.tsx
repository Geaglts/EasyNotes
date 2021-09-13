import { useContext } from 'react';
import { Context } from '../Context';
import '../styles/Components/Message.scss';

interface MessageProps {
  textMessage: string;
}

function Message(props: MessageProps) {
  const { darkTheme } = useContext(Context);
  return (
    <p className={`Message ${darkTheme ? 'MessageDark' : ''}`}>
      {props.textMessage}
    </p>
  );
}

export { Message };

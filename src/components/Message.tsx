import '../styles/Components/Message.scss';

interface MessageProps {
  textMessage: string;
}

function Message(props: MessageProps) {
  return <p className="Message">{props.textMessage}</p>;
}

export { Message };

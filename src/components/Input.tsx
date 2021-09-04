import { InputHTMLAttributes } from 'react';
import { MdSentimentVeryDissatisfied } from 'react-icons/md';

import '../styles/Components/Input.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon?: JSX.Element;
}

function Input(props: InputProps) {
  const { Icon, ...rest } = props;
  return (
    <div className="Input">
      <div className="Input__Icon">{Icon || <MdSentimentVeryDissatisfied />}</div>
      <input className="Input__Input" {...rest}></input>
    </div>
  );
}

export default Input;

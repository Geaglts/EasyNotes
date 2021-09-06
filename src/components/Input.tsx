import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { MdSentimentVeryDissatisfied } from 'react-icons/md';

import '../styles/Components/Input.scss';

interface InputPropsNew extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  Icon?: JSX.Element;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon?: JSX.Element;
}

function Input(props: InputPropsNew) {
  const { Icon, ...rest } = props;
  return (
    <div className="Input">
      <div className="Input__Icon">{Icon || <MdSentimentVeryDissatisfied />}</div>
      <textarea className="Input__TextArea" {...rest}></textarea>
    </div>
  );
}

export default Input;

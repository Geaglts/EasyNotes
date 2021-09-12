import { useContext } from 'react';
import { Context } from '../Context';
import { MdSentimentVeryDissatisfied } from 'react-icons/md';
import React, { TextareaHTMLAttributes } from 'react';
import '../styles/Components/TextArea.scss';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  Icon?: React.ReactNode;
}

function TextArea(props: TextAreaProps) {
  const { darkTheme } = useContext(Context);
  const { Icon, ...rest } = props;

  return (
    <div className={`TextArea ${darkTheme ? 'Dark' : ''}`}>
      <div className="TextArea__Icon">
        {Icon ? Icon : <MdSentimentVeryDissatisfied />}
      </div>
      <textarea className="TextArea__TextArea" {...rest}></textarea>
    </div>
  );
}

export default TextArea;

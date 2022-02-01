import React, { useContext } from 'react';
import { Context } from '../Context';
import { MdSentimentVeryDissatisfied } from 'react-icons/md';

import '../styles/Components/Input.scss';

export const SimpleInput = ({ classes, ...rest }) => {
  const { theme } = useContext(Context);
  return <input className={`SimpleInput ${theme}${!classes ? '' : ' ' + classes.join(' ')}`} {...rest} />;
};

export const SimpleTextArea = ({ classes, ...rest }) => {
  const { theme } = useContext(Context);
  const classname = `SimpleTextArea ${theme}${!classes ? '' : ' ' + classes.join(' ')}`;
  return <textarea className={classname} {...rest}></textarea>;
};

function Input(props) {
  const { darkTheme } = useContext(Context);
  const { Icon, ...rest } = props;
  return (
    <div className={`Input ${darkTheme ? 'InputDark' : ''}`}>
      <div className="Input__Icon">{Icon || <MdSentimentVeryDissatisfied />}</div>
      <textarea className="Input__TextArea" {...rest}></textarea>
    </div>
  );
}

export default Input;

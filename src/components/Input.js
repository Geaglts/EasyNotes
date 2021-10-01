import React, { useContext } from 'react';
import { Context } from '../Context';
import { MdSentimentVeryDissatisfied } from 'react-icons/md';

import '../styles/Components/Input.scss';

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

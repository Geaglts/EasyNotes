import React, { useContext } from 'react';
import { Context } from '../Context';
import { MdSentimentVeryDissatisfied } from 'react-icons/md';
import '../styles/Components/TextArea.scss';

function TextArea(props) {
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

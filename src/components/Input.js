import { useContext, useState, forwardRef } from 'react';
import { MdSentimentVeryDissatisfied } from 'react-icons/md';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Context } from '../Context';
import classnames from '@utils/classnames';

import '../styles/Components/Input.scss';

export const SimpleInput = forwardRef((props, ref) => {
  const { classes = [], isPassword = false, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useContext(Context);

  const handleTogglePasswordIcon = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="SimpleInput_Container">
      <input
        className={classnames('SimpleInput', theme, ...classes)}
        ref={ref}
        {...rest}
        type={isPassword ? (showPassword ? 'text' : 'password') : rest.type}
      />
      {isPassword && (
        <div className="SimpleInput_Password-icon">
          {showPassword ? (
            <AiOutlineEyeInvisible
              onClick={handleTogglePasswordIcon}
              title="Ocultar contraseña"
            />
          ) : (
            <AiOutlineEye
              onClick={handleTogglePasswordIcon}
              title="Mostrar contraseña"
            />
          )}
        </div>
      )}
    </div>
  );
});

export const SimpleTextArea = ({ classes, ...rest }) => {
  const { theme } = useContext(Context);
  const classname = `SimpleTextArea ${theme}${
    !classes ? '' : ' ' + classes.join(' ')
  }`;
  return <textarea className={classname} {...rest}></textarea>;
};

function Input(props) {
  const { darkTheme } = useContext(Context);
  const { Icon, classNames = [], ...rest } = props;
  return (
    <div className={`Input ${darkTheme ? 'InputDark' : ''} ${classNames.join(' ')}`}>
      <div className="Input__Icon">{Icon || <MdSentimentVeryDissatisfied />}</div>
      <textarea className="Input__TextArea" {...rest}></textarea>
    </div>
  );
}

export default Input;
